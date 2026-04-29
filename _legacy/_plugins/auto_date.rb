Jekyll::Hooks.register :posts, :pre_render do |post|
  # If the post doesn't have a date, auto-generate one
  unless post.data['date']
    # Use file modification time, or current time as fallback
    if File.exist?(post.path)
      post.data['date'] = File.mtime(post.path)
    else
      post.data['date'] = Time.now
    end
  end
end