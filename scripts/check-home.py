# Run through the isolated Helium agent; the harness provides browser helpers.
import base64
import os
import tempfile
import time
from pathlib import Path

origin = os.environ.get('ADAM_PREVIEW_URL', 'http://127.0.0.1:3110')
screenshots = Path(os.environ.get('ADAM_SCREENSHOT_DIR', tempfile.gettempdir()))


def wait_until(expression, seconds=15):
    deadline = time.monotonic() + seconds
    while time.monotonic() < deadline:
        if js(expression):
            return
        time.sleep(.25)
    raise AssertionError(expression)


def open_page():
    new_tab(origin)
    cdp('Page.bringToFront')
    wait_for_load()
    wait_until('document.images.length > 0 && [...document.images].every(i => i.complete && i.naturalWidth > 0)')


open_page()
assert js('document.querySelector("meta[property=\\"og:title\\"]").content') == 'Adam Pang'
assert js('getComputedStyle(document.body).backgroundColor') == 'rgb(255, 255, 255)'
assert js('document.querySelector("h1").getBoundingClientRect().height') > 20
# Both players are embedded directly; the site loads no web fonts.
assert js('document.querySelectorAll("iframe").length') == 2
assert js('document.querySelectorAll("iframe")[0].src').startswith('https://open.spotify.com/embed/playlist/')
assert js('[...document.querySelectorAll("nav ul")].every(u => getComputedStyle(u).gridTemplateColumns.split(" ").length === 3)')
assert js('document.querySelectorAll("iframe")[1].src').startswith('https://www.youtube-nocookie.com/embed/')
assert js('document.fonts.size') == 0
assert js('document.querySelector("main").innerText.trim()') == 'Adam Pang'
assert not js('document.body.innerText.includes("from Guam")')
assert not js('document.body.innerText.includes("Play music")')
assert not js('document.querySelector("a[href*=\\"pangaea.blog\\"]")')
assert js('document.querySelectorAll("nav[aria-label=Elsewhere] a").length') == 6
assert js('[...document.querySelectorAll("nav[aria-label=Elsewhere] a")].every(a => a.querySelector("svg") && a.getAttribute("aria-label") && a.target === "_blank" && a.rel.includes("noopener"))')
assert js('[...document.querySelectorAll("nav[aria-label=\\"Say hello\\"] a")].map(a => a.getAttribute("aria-label")).join()') == 'Call,Email,Book a call'
assert not js('document.querySelector("main a[href=\\"/cv\\"], main a[href=\\"/outlier\\"], main a[href=\\"/privacy\\"]")')
assert js('document.querySelector("link[rel=icon]").href').endswith('favicon.svg?v=yin-yang-2')
assert js('[...document.querySelectorAll("figure img")].some(i => i.src.includes("gold-frame.png"))')
assert js('document.querySelectorAll("[data-lock], [role=dialog]").length') == 0

for width, height in [(1440, 900), (1366, 768), (1024, 768), (1280, 600), (768, 1024), (601, 900), (390, 844), (320, 740)]:
    cdp('Emulation.setDeviceMetricsOverride', width=width, height=height, deviceScaleFactor=1, mobile=width < 600)
    time.sleep(.25)
    info = page_info()
    assert info['pw'] <= width, info
    if width >= 1024:
        assert info['ph'] <= height, info
    assert js('[...document.querySelectorAll("nav a")].every(a => a.scrollWidth <= a.clientWidth + 1)')
    print('Layout', width, height, 'passed')
    if width in (1366, 390):
        screenshots.joinpath(f'adam-framed-{width}.png').write_bytes(
            base64.b64decode(cdp('Page.captureScreenshot', format='png')['data']))

cdp('Emulation.setDeviceMetricsOverride', width=1366, height=768, deviceScaleFactor=1, mobile=False)
cdp('Emulation.setEmulatedMedia', features=[{'name': 'prefers-reduced-motion', 'value': 'reduce'}])
assert js('document.querySelector("figure").getBoundingClientRect().width') > 200
assert js('''document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"], a[href*="wa.me/"]').length''') == 2

cdp('Input.dispatchKeyEvent', type='keyDown', key='Tab', code='Tab', windowsVirtualKeyCode=9)
cdp('Input.dispatchKeyEvent', type='keyUp', key='Tab', code='Tab', windowsVirtualKeyCode=9)
assert js('document.activeElement.tagName') == 'A'
print('Visible content, contact links and keyboard entry passed')

open_page()
cdp('Emulation.setScriptExecutionDisabled', value=True)
try:
    cdp('Page.reload', ignoreCache=True)
    time.sleep(1)
    nodes = cdp('Accessibility.getFullAXTree')['nodes']
    roles = [n.get('role', {}).get('value') for n in nodes]
    assert roles.count('link') >= 9
    assert 'heading' in roles
    assert js('document.querySelector("h1").innerText') == 'Adam Pang'
    assert js('document.querySelectorAll("iframe").length') == 2
finally:
    cdp('Emulation.setScriptExecutionDisabled', value=False)
print('JavaScript-disabled content, players and contact access passed')
