module Jekyll
  class ThemeManager < Generator
    safe true
    priority :high

    def generate(site)
      # Load themes from _data/themes.yml
      themes_file = File.join(site.source, '_data', 'themes.yml')

      if File.exist?(themes_file)
        themes_data = YAML.load_file(themes_file)

        # Set current theme from config
        current_theme_name = site.config['current_theme'] || themes_data['default_theme'] || 'memoryland'
        current_theme = themes_data['themes'][current_theme_name]

        # Make theme data available to templates
        site.data['current_theme'] = current_theme
        site.data['all_themes'] = themes_data['themes']
        site.data['theme_switching_enabled'] = site.config['allow_theme_switching']

        # Add current theme name for JavaScript
        site.data['current_theme_name'] = current_theme_name
      end
    end
  end
end