#!/usr/bin/env python3
"""
Create an enhanced premium SF monogram logo for SalihFx Game Center
with professional neon effects and gaming aesthetics.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

def draw_smooth_line(draw, points, color, width, glow=False, glow_color=None, glow_alpha=50):
    """Draw a smooth line through multiple points with optional glow effect."""
    if len(points) < 2:
        return
    
    # Draw glow if requested
    if glow and glow_color:
        for glow_size in range(20, 0, -4):
            alpha = int(glow_alpha * (glow_size / 20))
            for i in range(len(points) - 1):
                draw.line([points[i], points[i + 1]], fill=(*glow_color, alpha), 
                         width=width + glow_size)
    
    # Draw main line
    for i in range(len(points) - 1):
        draw.line([points[i], points[i + 1]], fill=color, width=width)
        # Add highlight
        x1, y1 = points[i]
        x2, y2 = points[i + 1]
        mid_x, mid_y = (x1 + x2) / 2, (y1 + y2) / 2
        draw.ellipse([mid_x - 2, mid_y - 2, mid_x + 2, mid_y + 2], fill=(255, 255, 255, 200))

def create_enhanced_sf_logo():
    # Logo dimensions (high resolution)
    size = 1200
    img = Image.new('RGBA', (size, size), (10, 10, 15, 255))
    draw = ImageDraw.Draw(img)
    
    # Brand colors
    orange = (255, 140, 0)
    orange_glow = (255, 100, 0)
    cyan = (0, 212, 232)
    cyan_glow = (0, 180, 200)
    red = (255, 45, 85)
    red_glow = (255, 30, 70)
    white = (255, 255, 255)
    
    center = size // 2
    
    # Create dark gradient background
    for y in range(size):
        factor = y / size
        r = int(10 + factor * 8)
        g = int(10 + factor * 8)
        b = int(15 + factor * 12)
        draw.rectangle([(0, y), (size, y + 1)], fill=(r, g, b, 255))
    
    # Add subtle tech grid
    grid_size = 50
    for x in range(0, size, grid_size):
        for y in range(0, size, grid_size):
            if (x + y) % (grid_size * 2) == 0:
                draw.ellipse([x - 1, y - 1, x + 1, y + 1], fill=(25, 25, 35, 80))
    
    # Draw outer octagonal frame
    oct_radius = 520
    oct_points = []
    for i in range(8):
        angle = math.radians(45 * i - 22.5)
        x = center + oct_radius * math.cos(angle)
        y = center + oct_radius * math.sin(angle)
        oct_points.append((x, y))
    
    # Outer frame with cyan glow
    for glow_size in range(15, 0, -3):
        alpha = 20 - glow_size
        oct_glow = []
        for px, py in oct_points:
            oct_glow.extend([px, py])
        draw.polygon(oct_glow, outline=(*cyan_glow, alpha), width=glow_size)
    
    draw.polygon(oct_points, outline=cyan, width=5)
    
    # Draw inner hexagonal frame
    hex_radius = 440
    hex_points = []
    for i in range(6):
        angle = math.radians(60 * i + 30)
        x = center + hex_radius * math.cos(angle)
        y = center + hex_radius * math.sin(angle)
        hex_points.append((x, y))
    
    # Inner frame with orange glow
    for glow_size in range(12, 0, -2):
        alpha = 18 - glow_size
        hex_glow = []
        for px, py in hex_points:
            hex_glow.extend([px, py])
        draw.polygon(hex_glow, outline=(*orange_glow, alpha), width=glow_size)
    
    draw.polygon(hex_points, outline=orange, width=4)
    
    # Create premium S letter
    s_points = []
    
    # Top of S
    s_center_x = center - 70
    s_top_y = center - 120
    s_mid_y = center
    s_bottom_y = center + 120
    
    # Top curve (going right)
    for i in range(100):
        t = i / 100
        angle = math.pi/2 + t * math.pi
        radius = 60
        x = s_center_x + radius * math.cos(angle)
        y = s_top_y + radius * math.sin(angle)
        s_points.append((x, y))
    
    # Middle vertical (going down)
    s_points.append((s_center_x + 60, s_mid_y))
    s_points.append((s_center_x - 60, s_mid_y))
    
    # Bottom curve (going right)
    for i in range(100):
        t = i / 100
        angle = -math.pi/2 + t * math.pi
        radius = 60
        x = s_center_x + radius * math.cos(angle)
        y = s_bottom_y + radius * math.sin(angle)
        s_points.append((x, y))
    
    # Draw S with premium neon effect
    draw_smooth_line(draw, s_points, orange, 22, glow=True, glow_color=orange_glow, glow_alpha=60)
    
    # Create premium F letter
    f_points = []
    f_center_x = center + 70
    
    # Vertical line (top to bottom)
    f_points.append((f_center_x, s_top_y))
    f_points.append((f_center_x, s_bottom_y))
    
    # Top horizontal line
    f_top = [(f_center_x, s_top_y), (f_center_x + 110, s_top_y)]
    
    # Middle horizontal line
    f_mid = [(f_center_x, s_mid_y), (f_center_x + 90, s_mid_y)]
    
    # Draw F with cyan neon effect
    draw_smooth_line(draw, f_points, cyan, 22, glow=True, glow_color=cyan_glow, glow_alpha=60)
    draw_smooth_line(draw, f_top, cyan, 22, glow=True, glow_color=cyan_glow, glow_alpha=60)
    draw_smooth_line(draw, f_mid, cyan, 22, glow=True, glow_color=cyan_glow, glow_alpha=60)
    
    # Add corner accents (red gaming elements)
    accent_radius = 380
    for i in range(0, 360, 90):
        angle = math.radians(i)
        x = center + accent_radius * math.cos(angle)
        y = center + accent_radius * math.sin(angle)
        
        # Draw red accent with glow
        for glow in range(10, 0, -2):
            alpha = 15 - glow
            draw.ellipse([x - glow - 8, y - glow - 8, x + glow + 8, y + glow + 8], 
                        fill=(*red_glow, alpha))
        draw.ellipse([x - 8, y - 8, x + 8, y + 8], fill=red)
        draw.ellipse([x - 4, y - 4, x + 4, y + 4], fill=(255, 255, 255, 180))
    
    # Add tech ring elements
    ring_radius = 320
    for ring in range(3):
        radius = ring_radius - ring * 25
        for i in range(0, 360, 20):
            angle = math.radians(i + ring * 10)
            x1 = center + (radius - 8) * math.cos(angle)
            y1 = center + (radius - 8) * math.sin(angle)
            x2 = center + (radius + 8) * math.cos(angle)
            y2 = center + (radius + 8) * math.sin(angle)
            color = (*orange, 50) if ring == 0 else (*cyan, 40) if ring == 1 else (*red, 30)
            draw.line([x1, y1, x2, y2], fill=color, width=2)
    
    # Central tech hub
    hub_radius = 70
    # Outer ring
    draw.ellipse([center - hub_radius, center - hub_radius, 
                  center + hub_radius, center + hub_radius], 
                 outline=(60, 60, 80, 200), width=4)
    
    # Inner details
    for i in range(0, 360, 45):
        angle = math.radians(i)
        x1 = center + (hub_radius - 20) * math.cos(angle)
        y1 = center + (hub_radius - 20) * math.sin(angle)
        x2 = center + hub_radius * math.cos(angle)
        y2 = center + hub_radius * math.sin(angle)
        color = orange if i % 90 == 0 else cyan if i % 90 == 45 else red
        draw.line([x1, y1, x2, y2], fill=color, width=3)
    
    # Center circle
    draw.ellipse([center - 25, center - 25, center + 25, center + 25], 
                 fill=(20, 20, 30, 255), outline=cyan, width=3)
    
    # Add premium corner brackets
    bracket_size = 100
    bracket_width = 15
    
    # Top-left bracket
    for i in range(bracket_size):
        alpha = int(200 * (1 - i / bracket_size))
        draw.line([80 + i, 80, 80 + i, 80 + bracket_width], fill=(*orange, alpha), width=2)
        draw.line([80, 80 + i, 80 + bracket_width, 80 + i], fill=(*orange, alpha), width=2)
    
    # Top-right bracket
    for i in range(bracket_size):
        alpha = int(200 * (1 - i / bracket_size))
        draw.line([size - 80 - i, 80, size - 80 - i, 80 + bracket_width], fill=(*cyan, alpha), width=2)
        draw.line([size - 80, 80 + i, size - 80 - bracket_width, 80 + i], fill=(*cyan, alpha), width=2)
    
    # Bottom-left bracket
    for i in range(bracket_size):
        alpha = int(200 * (1 - i / bracket_size))
        draw.line([80 + i, size - 80, 80 + i, size - 80 - bracket_width], fill=(*red, alpha), width=2)
        draw.line([80, size - 80 - i, 80 + bracket_width, size - 80 - i], fill=(*red, alpha), width=2)
    
    # Bottom-right bracket
    for i in range(bracket_size):
        alpha = int(200 * (1 - i / bracket_size))
        draw.line([size - 80 - i, size - 80, size - 80 - i, size - 80 - bracket_width], fill=(*orange, alpha), width=2)
        draw.line([size - 80, size - 80 - i, size - 80 - bracket_width, size - 80 - i], fill=(*orange, alpha), width=2)
    
    # Apply final glow effect
    img_glow = img.filter(ImageFilter.GaussianBlur(radius=1.5))
    img = Image.alpha_composite(img_glow, img)
    
    # Save high quality PNG
    output_path = '/home/z/salihfx-gamecenter/public/images/salihfx-logo.png'
    img.save(output_path, 'PNG', optimize=True, quality=100)
    print(f"✓ Premium SF logo created successfully at: {output_path}")
    print(f"  Size: {size}x{size} pixels")
    
    return img

if __name__ == '__main__':
    create_enhanced_sf_logo()
