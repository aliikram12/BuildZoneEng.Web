import os
import glob

def add_seo_favicon():
    directory = r"d:\Bahjat Bhai\BuildZoneEng.Web"
    html_files = glob.glob(os.path.join(directory, "*.html"))
    
    seo_tags = """
  <!-- Favicon & SEO Meta Tags -->
  <link rel="icon" type="image/png" href="Data/Logo/Logo.png">
  <meta name="keywords" content="Steel Construction, Prefabricated Buildings, Porta Cabins, Pre-Engineered Buildings, Build Zone Prefab, Lahore, Pakistan">
  <meta name="author" content="Build Zone Prefab">
  <meta property="og:title" content="Build Zone Prefab | Premium Steel Construction">
  <meta property="og:description" content="Build Zone Prefab (PVT) LTD - Premium steel construction and prefabricated engineering solutions since 2012.">
  <meta property="og:image" content="Data/Logo/Logo.png">
  <meta property="og:url" content="https://www.buildzoneprefab.com">
"""
    
    for filepath in html_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Check if already added to prevent duplicates
        if "<!-- Favicon & SEO Meta Tags -->" not in content:
            # Find the closing </head> tag and insert tags before it
            if "</head>" in content:
                content = content.replace("</head>", seo_tags + "</head>")
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)

if __name__ == "__main__":
    add_seo_favicon()
    print("SEO and Favicon added successfully.")
