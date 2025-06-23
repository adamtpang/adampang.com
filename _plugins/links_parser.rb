module Jekyll
  class LinksGenerator < Generator
    safe true
    priority :high

    def generate(site)
      links_file = File.join(site.source, '_links', 'links.md')

      if File.exist?(links_file)
        content = File.read(links_file)

        # Extract content after frontmatter
        if content =~ /\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m
          content = content[($1 + $2).length..-1]
        end

        links = []
        content.each_line do |line|
          line = line.strip
          next if line.empty? || line.start_with?('#')

          # Parse format: title | url | target
          if line.match(/^([^|]+)\s*\|\s*(\S+)(?:\s*\|\s*(\S+))?/)
            title = $1.strip
            url = $2
            target = $3

            links << {
              'title' => title,
              'url' => url,
              'target' => target
            }
          end
        end

        site.data['links'] = links
      end
    end
  end
end