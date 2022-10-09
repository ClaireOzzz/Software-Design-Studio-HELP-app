
module NavigationHelpers
    def path_to(page_name)
    # Maps a name to a path. Used by the
    #
    #   When /^I go to (.+)$/ do |page_name|
    #
    # step definition in web_steps.rb
    #
        case page_name
      
        when /^home$/ then '/'
        when /^feed$/ then '/users/1/feed'
        when /^profile$/ then '/users/1/profile'
        when /^notification$/ then '/users/1/notification'
        when /^new request$/ then '/users/1/feed/new'
        when /^request form$/ then '/users/1/feed/new'
        when /^accommodation form$/ then '/users/1/feed/new/accommodation'
  
      # Add more mappings here.
      # Here is an example that pulls values out of the Regexp:
      #
      #   when /^(.*)'s profile page$/i
      #     user_profile_path(User.find_by_login($1))
  
      else
        begin
          page_name =~ /^the (.*) page$/
          path_components = $1.split(/\s+/)
          self.send(path_components.push('path').join('_').to_sym)
        rescue NoMethodError, ArgumentError
          raise "Can't find mapping from \"#{page_name}\" to a path.\n" +
            "Now, go and add a mapping in #{__FILE__}"
        end
      end
    end
  end
  
  World(NavigationHelpers)