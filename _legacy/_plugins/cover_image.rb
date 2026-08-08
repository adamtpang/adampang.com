Jekyll::Hooks.register :posts, :pre_render do |post|
  # Extract first image from post content
  content = post.content
  
  # Look for markdown image syntax: ![alt](image_url)
  markdown_match = content.match(/!\[.*?\]\((.*?)\)/)
  
  # Look for HTML image tags: <img src="...">
  html_match = content.match(/<img[^>]+src\s*=\s*['"](.*?)['"][^>]*>/i)
  
  if markdown_match
    post.data['cover_image'] = markdown_match[1]
  elsif html_match
    post.data['cover_image'] = html_match[1]
  end
end