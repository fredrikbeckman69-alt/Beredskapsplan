from PIL import Image
import sys

def remove_white_background(img_path, dest_path, tolerance=240):
    try:
        img = Image.open(img_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Check if the pixel is close to white
            if item[0] > tolerance and item[1] > tolerance and item[2] > tolerance:
                # Add fully transparent pixel
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        # Add a subtle anti-aliasing near the edges or just save
        img.save(dest_path, "PNG")
        print("Success: Image saved to", dest_path)
    except Exception as e:
        print("Error:", e)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python process_logo.py <input> <output>")
        sys.exit(1)
    remove_white_background(sys.argv[1], sys.argv[2])
