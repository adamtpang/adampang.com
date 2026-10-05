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
assert js('document.querySelectorAll("iframe").length') == 1
assert js('document.querySelector("iframe").height') == '80'
assert js('document.querySelector("iframe").src').startswith('https://open.spotify.com/embed/playlist/')
assert not js('document.body.innerText.includes("from Guam")')
assert not js('document.body.innerText.includes("Play music")')
assert js('document.querySelector("link[rel=icon]").href').endswith('favicon.svg?v=yin-yang-2')
assert js('[...document.querySelectorAll("figure img")].some(i => i.src.includes("gold-frame.png"))')
assert js('document.querySelectorAll("[data-lock], [role=dialog]").length') == 0

for width, height in [(1440, 900), (1366, 768), (1024, 768), (1280, 600), (390, 844), (320, 740)]:
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
assert js('''document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"], a[href*="wa.me/"]').length''') == 3

cdp('Input.dispatchKeyEvent', type='keyDown', key='Tab', code='Tab', windowsVirtualKeyCode=9)
cdp('Input.dispatchKeyEvent', type='keyUp', key='Tab', code='Tab', windowsVirtualKeyCode=9)
assert js('document.activeElement.tagName') == 'A'
print('Visible content, immediate music embed, contact links and keyboard entry passed')

# The ordinary playlist destination remains available if the provider is blocked.
cdp('Network.enable')
cdp('Network.setBlockedURLs', urls=['*open.spotify.com*', '*embed-cdn.spotifycdn.com*'])
open_page()
assert js('document.querySelector("section[aria-label=Music] a").href').startswith('https://open.spotify.com/playlist/')
cdp('Network.setBlockedURLs', urls=[])
open_page()
assert js('document.querySelector("iframe").title') == "ult, Adam Pang's Spotify playlist"
assert js('document.activeElement.tagName') != 'IFRAME'
frame_id = js('document.querySelector("iframe").src')
js('document.querySelector("nav[aria-label=Elsewhere] a").focus()')
assert js('document.querySelector("iframe").src') == frame_id
assert js('document.querySelectorAll("iframe").length') == 1
screenshots.joinpath('adam-framed-music.png').write_bytes(
    base64.b64decode(cdp('Page.captureScreenshot', format='png')['data']))
print('Provider outlink fallback, loaded player and persistence passed')

open_page()
cdp('Emulation.setScriptExecutionDisabled', value=True)
try:
    cdp('Page.reload', ignoreCache=True)
    time.sleep(1)
    nodes = cdp('Accessibility.getFullAXTree')['nodes']
    roles = [n.get('role', {}).get('value') for n in nodes]
    assert roles.count('link') >= 9
    assert 'heading' in roles
    assert 'button' not in roles
    assert js('document.querySelector("h1").innerText') == 'Adam Pang'
    assert js('document.querySelector("iframe").getBoundingClientRect().height') == 80
finally:
    cdp('Emulation.setScriptExecutionDisabled', value=False)
print('JavaScript-disabled content, media outlink and contact access passed')
