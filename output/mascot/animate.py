"""Render Kip's native pixel mascot as a transparent, forever-looping GIF.

Requires Pillow. Product logo PNGs are rasterized from public/logos/*.svg.
"""
from pathlib import Path
import math
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent
W, H, FPS, SECONDS = 480, 400, 20, 14
BLUE = '#6d93db'
OUTER = [(8,3),(20,3),(20,4),(23,4),(23,6),(25,6),(25,9),(26,9),(26,21),(24,21),(24,24),(21,24),(21,25),(7,25),(7,24),(4,24),(4,21),(2,21),(2,9),(3,9),(3,6),(5,6),(5,4),(8,4)]
INNER = [(7,8),(21,8),(21,9),(23,9),(23,20),(21,20),(21,21),(7,21),(7,20),(5,20),(5,9),(7,9)]

def paste_center(canvas, item, x, y):
    canvas.alpha_composite(item, (round(x-item.width/2), round(y-item.height/2)))

def ease(u):
    return .5-.5*math.cos(math.pi*max(0,min(1,u)))

def sprite(look=0, blink=1, sleepy=False):
    im=Image.new('RGBA',(168,168)); d=ImageDraw.Draw(im)
    d.polygon([(x*6,y*6) for x,y in OUTER],fill=BLUE)
    d.polygon([(x*6,y*6) for x,y in INNER],fill='#303030')
    for x in [9,17]:
        hh=max(3,round(30*blink)); yy=81-hh//2
        d.rectangle((x*6+look,yy,x*6+11+look,yy+hh-1),fill='white')
    return im

logos=[]
for name in ['codex','claude','antigravity']:
    badge=Image.new('RGBA',(72,72)); d=ImageDraw.Draw(badge)
    d.rounded_rectangle((0,0,71,71),radius=16,fill='white',outline='#e2e4e9',width=2)
    badge.alpha_composite(Image.open(ROOT/f'{name}.png').convert('RGBA'),(8,8))
    logos.append(badge)

def sparkle(canvas,x,y,scale=1,color=BLUE):
    d=ImageDraw.Draw(canvas); a=max(2,round(8*scale)); b=max(1,round(2*scale))
    d.polygon([(x,y-a),(x+b,y-b),(x+a,y),(x+b,y+b),(x,y+a),(x-b,y+b),(x-a,y),(x-b,y-b)],fill=color)

def render(t):
    canvas=Image.new('RGBA',(W,H)); x,y=240,264
    sx=sy=1.; rot=look=0; blink=1.
    # Gentle breathing and two deliberate blinks.
    y-=2*math.sin(t*math.pi)
    for bt in [.75,3.05,11.3,13.5]:
        if abs(t-bt)<.12: blink=max(.12,abs(t-bt)/.12)
    if 1.2<t<2.7:
        look=round(5*math.sin((t-1.2)/1.5*2*math.pi))
        rot=3*math.sin((t-1.2)/1.5*2*math.pi)
    # Anticipation, launch, recoil, settle for a three-logo fan toss.
    if 3.4<=t<3.65:
        u=ease((t-3.4)/.25); sx=1+.16*u; sy=1-.18*u; y+=12*u; rot=-7*u
    elif 3.65<=t<4.15:
        u=(t-3.65)/.5; y-=46*math.sin(math.pi*u); sx=.93; sy=1.08; rot=8*math.sin(math.pi*u)
    elif 4.15<=t<4.55:
        u=(t-4.15)/.4; sx=1+.12*math.sin(math.pi*u); sy=1-.1*math.sin(math.pi*u)
    # A delighted wiggle.
    if 5.7<t<6.8:
        u=(t-5.7)/1.1; rot=10*math.sin(u*4*math.pi)*math.sin(math.pi*u)
        y-=9*abs(math.sin(u*2*math.pi))
    # Sleepy eyes, then a startled wake-up.
    if 7.1<t<8.7:
        u=min(1,(t-7.1)/.5); blink=1-.85*ease(u); rot=-7*ease(u)
        d=ImageDraw.Draw(canvas)
        for j in range(3):
            p=((t-7.1)/1.6+j/3)%1
            xx=305+38*p; yy=210-78*p
            d.text((xx,yy),'z' if j else 'Z',fill=BLUE,stroke_width=1)
    if 8.7<=t<9.35:
        u=(t-8.7)/.65; y-=52*math.sin(math.pi*u); rot=360*ease(u)
        sx=1-.08*math.sin(math.pi*u); sy=1+.08*math.sin(math.pi*u)
    # A second automatic throw: staggered arcs, opposite spin directions.
    if 10<=t<10.4:
        u=(t-10)/.4; sx=1+.12*math.sin(math.pi*u); sy=1-.16*math.sin(math.pi*u); y+=8*math.sin(math.pi*u)
    if 10.4<=t<11.1:
        u=(t-10.4)/.7; y-=32*math.sin(math.pi*u); rot=-7*math.sin(2*math.pi*u)
    body=sprite(look,blink)
    body=body.resize((round(168*sx),round(168*sy)),Image.Resampling.NEAREST)
    body=body.rotate(rot,resample=Image.Resampling.NEAREST,expand=True)
    paste_center(canvas,body,x,y)
    for start in [3.7,10.4]:
        for j,badge in enumerate(logos):
            u=(t-start-j*.13)/1.65
            if 0<=u<=1:
                dx=[-164,0,164][j]
                px=240+dx*u; py=216-580*u*(1-u)+110*u
                sc=min(1,.25+u*5)*(1-.8*ease((u-.82)/.18))
                item=badge.resize((max(1,round(72*sc)),)*2,Image.Resampling.LANCZOS)
                item=item.rotate((1 if j%2==0 else -1)*260*u,resample=Image.Resampling.BICUBIC,expand=True)
                paste_center(canvas,item,px,py)
                if .12<u<.68:
                    sparkle(canvas,round(px-dx*.08),round(py+34),.55)
    if 9.05<t<9.65:
        u=(t-9.05)/.6
        for dx,dy in [(-108,-60),(100,-90),(115,14)]:
            sparkle(canvas,240+dx*(.8+.2*u),245+dy,math.sin(math.pi*u))
    return canvas

frames=[render(i/FPS) for i in range(FPS*SECONDS)]
# One shared palette, with index 255 reserved exclusively for clear pixels.
sheet=Image.new('RGB',(W*8,H*5),'white')
for j,i in enumerate(range(0,len(frames),7)):
    sheet.paste(frames[i].convert('RGB'),((j%8)*W,(j//8)*H))
palette=sheet.quantize(colors=255,method=Image.Quantize.MEDIANCUT)
encoded=[]
for frame in frames:
    p=frame.convert('RGB').quantize(palette=palette,dither=Image.Dither.NONE)
    p.paste(255,mask=frame.getchannel('A').point(lambda a:255 if a<128 else 0))
    p.info['transparency']=255
    encoded.append(p)
encoded[0].save(ROOT/'kip-mascot-transparent.gif',save_all=True,append_images=encoded[1:],duration=50,loop=0,disposal=2,transparency=255,optimize=False)
# Also provide full-alpha animation for uses where GIF edge transparency is limiting.
frames[0].save(ROOT/'kip-mascot-transparent.webp',save_all=True,append_images=frames[1:],duration=50,loop=0,lossless=True)
preview=Image.new('RGB',(W*3,H*2),'#edf0f5')
for j,t in enumerate([1.9,4.25,6.15,8.2,9.1,10.95]):
    f=render(t); preview.paste(f,((j%3)*W,(j//3)*H),f)
preview.save(ROOT/'contact-sheet.png')
gif=Image.open(ROOT/'kip-mascot-transparent.gif')
duration=0
for i in range(gif.n_frames):
    gif.seek(i); duration+=gif.info['duration']
    assert gif.convert('RGBA').getpixel((0,0))[3]==0
assert gif.info['loop']==0 and duration==14000
print(f'Verified {gif.n_frames} frames, {duration} ms, transparent corners, infinite loop.')
print(ROOT/'kip-mascot-transparent.gif')
