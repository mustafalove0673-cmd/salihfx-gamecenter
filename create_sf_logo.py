#!/usr/bin/env python3
"""
Create a premium SF monogram logo for SalihFx Game Center
with neon effects and gaming aesthetics.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

def create_sf_logo():
    # Logo dimensions
    size = 1024
    img = Image.new('RGBA', (size, size), (15, 15, 20, 255))
    draw = ImageDraw.Draw(img)
    
    # Brand colors
    orange = (255, 140, 0)
    cyan = (0, 212, 232)
    red = (255, 45, 85)
    white = (255, 255, 255)
    dark_bg = (15, 15, 20)
    
    # Create gradient background
    for y in range(size):
        r = int(15 + (y / size) * 5)
        g = int(15 + (y / size) * 5)
        b = int(20 + (y / size) * 8)
        draw.rectangle([(0, y), (size, y + 1)], fill=(r, g, b, 255))
    
    # Center point
    center = size // 2
    
    # Draw outer hexagonal frame with neon glow
    hex_radius = 450
    points = []
    for i in range(6):
        angle = math.radians(60 * i - 30)
        x = center + hex_radius * math.cos(angle)
        y = center + hex_radius * math.sin(angle)
        points.append((x, y))
    
    # Draw hexagon with glow
    for glow_size in range(10, 0, -2):
        alpha = 15 - glow_size
        glow_points = []
        for px, py in points:
            glow_points.extend([px, py])
        draw.polygon(glow_points, outline=(*cyan, alpha), width=glow_size)
    
    draw.polygon(points, outline=cyan, width=4)
    
    # Draw inner geometric frame
    inner_radius = 380
    inner_points = []
    for i in range(6):
        angle = math.radians(60 * i + 30)
        x = center + inner_radius * math.cos(angle)
        y = center + inner_radius * math.sin(angle)
        inner_points.append((x, y))
    
    for glow_size in range(8, 0, -2):
        alpha = 12 - glow_size
        glow_inner_points = []
        for px, py in inner_points:
            glow_inner_points.extend([px, py])
        draw.polygon(glow_inner_points, outline=(*orange, alpha), width=glow_size)
    
    draw.polygon(inner_points, outline=orange, width=3)
    
    # Create S with neon effect
    s_path = []
    # Top curve
    for angle in range(90, 270, 5):
        rad = math.radians(angle)
        x = center - 80 + 70 * math.cos(rad)
        y = center - 60 + 70 * math.sin(rad)
        s_path.append((x, y))
    
    # Bottom curve
    for angle in range(270, 450, 5):
        rad = math.radians(angle)
        x = center + 80 + 70 * math.cos(rad)
        y = center + 60 + 70 * math.sin(rad)
        s_path.append((x, y))
    
    # Draw S with glow layers
    for glow in range(30, 0, -5):
        alpha = int(40 * (glow / 30))
        for i in range(len(s_path) - 1):
            draw.line([s_path[i], s_path[i + 1]], fill=(*orange, alpha), width=20 + glow)
    
    for i in range(len(s_path) - 1):
        draw.line([s_path[i], s_path[i + 1]], fill=orange, width=18)
    
    # Add highlight to S
    for i in range(len(s_path) - 1):
        x1, y1 = s_path[i]
        x2, y2 = s_path[i + 1]
        mid_x = (x1 + x2) / 2
        mid_y = (y1 + y2) / 2
        draw.ellipse([mid_x - 3, mid_y - 3, mid_x + 3, mid_y + 3], fill=white)
    
    # Create F with neon effect
    f_x = center + 60
    f_top_y = center - 100
    f_mid_y = center
    f_bottom_y = center + 140
    
    # Vertical line of F
    f_points = [
        (f_x, f_top_y),
        (f_x, f_bottom_y)
    ]
    
    # Top horizontal line
    f_top_line = [
        (f_x, f_top_y),
        (f_x + 100, f_top_y)
    ]
    
    # Middle horizontal line
    f_mid_line = [
        (f_x, f_mid_y),
        (f_x + 80, f_mid_y)
    ]
    
    # Draw F with glow
    for glow in range(30, 0, -5):
        alpha = int(40 * (glow / 30))
        # Vertical
        draw.line(f_points, fill=(*cyan, alpha), width=20 + glow)
        # Top horizontal
        draw.line(f_top_line, fill=(*cyan, alpha), width=20 + glow)
        # Middle horizontal
        draw.line(f_mid_line, fill=(*cyan, alpha), width=20 + glow)
    
    # Main F lines
    draw.line(f_points, fill=cyan, width=18)
    draw.line(f_top_line, fill=cyan, width=18)
    draw.line(f_mid_line, fill=cyan, width=18)
    
    # Add highlights to F
    for i in range(0, 240, 30):
        y = f_top_y + i
        if y <= f_bottom_y:
            draw.ellipse([f_x - 3, y - 3, f_x + 3, y + 3], fill=white)
    
    # Corner highlights on F
    draw.ellipse([f_x + 95, f_top_y - 3, f_x + 101, f_top_y + 3], fill=white)
    draw.ellipse([f_x + 75, f_mid_y - 3, f_x + 81, f_mid_y + 3], fill=white)
    
    # Add red accent lines for gaming feel
    accent_y = center + 180
    for offset in range(-50, 51, 10):
        alpha = int(100 * (1 - abs(offset) / 60))
        draw.line([center + offset - 30, accent_y, center + offset + 30, accent_y + 3], 
                 fill=(*red, alpha), width=2)
    
    # Add small decorative elements
    decor_radius = 300
    for i in range(0, 360, 45):
        angle = math.radians(i)
        x = center + decor_radius * math.cos(angle)
        y = center + decor_radius * math.sin(angle)
        for glow in range(8, 0, -2):
            draw.ellipse([x - glow, y - glow, x + glow, y + glow], 
                        fill=(*red, 10 - glow))
        draw.ellipse([x - 4, y - 4, x + 4, y + 4], fill=red)
    
    # Add subtle grid pattern for tech feel
    grid_spacing = 40
    for x in range(0, size, grid_spacing):
        for y in range(0, size, grid_spacing):
            draw.ellipse([x - 1, y - 1, x + 1, y + 1], fill=(30, 30, 40, 100))
    
    # Add central tech element
    tech_radius = 50
    for i in range(0, 360, 30):
        angle = math.radians(i)
        x1 = center + (tech_radius - 15) * math.cos(angle)
        y1 = center + (tech_radius - 15) * math.sin(angle)
        x2 = center + (tech_radius + 15) * math.cos(angle)
        y2 = center + (tech_radius + 15) * math.sin(angle)
        draw.line([x1, y1, x2, y2], fill=(50, 50, 70, 150), width=2)
    
    draw.ellipse([center - tech_radius, center - tech_radius, 
                  center + tech_radius, center + tech_radius], 
                 outline=(50, 50, 70, 200), width=3)
    
    # Apply subtle blur for glow effect
    img_glow = img.filter(ImageFilter.GaussianBlur(radius=2))
    img = Image.alpha_composite(img_glow, img)
    
    # Save the image
    output_path = '/home/z/salihfx-gamecenter/public/images/salihfx-logo.png'
    img.save(output_path, 'PNG', optimize=True)
    print(f"✓ Logo created successfully at: {output_path}")
    
    return img

if __name__ == '__main__':
    create_sf_logo()
