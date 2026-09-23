# Run through the dedicated Helium harness; helpers are provided by its runner.
import time

ORIGIN = 'http://127.0.0.1:3107'

def click_named(name, role='button'):
    nodes = cdp('Accessibility.getFullAXTree')['nodes']
    node = next(n for n in nodes if n.get('role', {}).get('value') == role and n.get('name', {}).get('value') == name)
    backend = node['backendDOMNodeId']
    cdp('DOM.scrollIntoViewIfNeeded', backendNodeId=backend)
    box = cdp('DOM.getBoxModel', backendNodeId=backend)['model']['content']
    click_at_xy(sum(box[0::2]) / 4, sum(box[1::2]) / 4)

new_tab(ORIGIN)
cdp('Page.bringToFront')
wait_for_load()
time.sleep(1)
if js('document.documentElement.classList.contains("dark")'):
    click_named('Switch to light mode')
    time.sleep(.3)

for width, height in [(1440, 900), (1366, 768), (1024, 768), (390, 844), (320, 740)]:
    cdp('Emulation.setDeviceMetricsOverride', width=width, height=height, deviceScaleFactor=1, mobile=False)
    time.sleep(.3)
    info = page_info()
    assert info['pw'] <= width, info
    if width >= 1024:
        assert info['ph'] <= height, info
    assert js('Array.from(document.querySelectorAll("#building a div")).every(e=>e.scrollWidth<=e.clientWidth+1)')
    print('Layout passed', width, height)

cdp('Emulation.setDeviceMetricsOverride', width=1366, height=768, deviceScaleFactor=1, mobile=False)
assert js('Array.from(document.images).every(i=>i.complete && i.naturalWidth>0)')
assert js('document.querySelectorAll("iframe").length') == 0
assert not js('performance.getEntriesByType("resource").some(r=>r.name.includes("open.spotify.com"))')
click_named('Switch to dark mode')
assert js('document.documentElement.classList.contains("dark")')
click_named('Switch to light mode')
assert not js('document.documentElement.classList.contains("dark")')

cdp('Emulation.setEmulatedMedia', features=[{'name': 'prefers-reduced-motion', 'value': 'reduce'}])
first = js('document.querySelector("#sounds button[aria-pressed=true]").innerText')
time.sleep(19)
assert js('document.querySelector("#sounds button[aria-pressed=true]").innerText') == first
assert not js('document.querySelector("#sounds .absolute.top-0")')
click_named('Load Spotify Wrapped 2023')
time.sleep(1)
assert js('document.querySelector("iframe").title') == 'Spotify Wrapped 2023'

# Native disclosure remains keyboard-operable.
js('document.querySelector("summary").focus()')
cdp('Input.dispatchKeyEvent', type='keyDown', key='Enter', code='Enter', windowsVirtualKeyCode=13, text='\r')
cdp('Input.dispatchKeyEvent', type='keyUp', key='Enter', code='Enter', windowsVirtualKeyCode=13)
assert js('document.querySelector("details").open')
print('Images, theme, reduced motion, Spotify consent and keyboard disclosure passed')

new_tab(ORIGIN + '/support')
cdp('Page.bringToFront')
wait_for_load()
cdp('Emulation.setDeviceMetricsOverride', width=320, height=740, deviceScaleFactor=1, mobile=True)
assert page_info()['pw'] <= 320
assert js('Array.from(document.querySelectorAll("a")).some(a=>a.href==="https://zcash.me/adamtpang")')
assert not js('/paid subscriber|patrons wall|first fifty|every dollar buys an hour/i.test(document.body.innerText)')
print('Support links, honest copy and mobile layout passed')
