# ShareMe 😄

Application similar to pininterest, where users can upload photos, save favourite photos and comment on the posts. Homepage is the pinboard where all the posts are displayed. Users can also search for posts by tags. Users can also follow other users and see their posts on their profile page. Users can also like and comment on the posts.

## Flow of the application

### Backend using sanity.io

- Using sanity studio to create the content
- Creating schemas (blueprint of the content)
  - For creating users
  - For Pin (includes custom data types like postedBy, comments, likes)

### Frontend using React + Tailwind CSS

- Setup the project using create-react-app from Tailwind Website
- Customize the tailwind.config.js
- Adding rules to .eslint.json
- Add lots of packages (React Icons, React Google Login, uuid , ...)
- Login page
  - Tailwind CSS Customizations
  - Adding video with dark overlay + controls
  - Integrating Google login and getting (name,email,picture) from the response using firebase
  - Adding new users to sanity database
  - Redirecting to the homepage once logged in
- Sidebar
  - Creating sidebar component wrt different screen sizes
  - In-depth Tailwind Classes
  - Link vs NavLink
  - User attributes naming convention mistake
  - Writing React Proptypes
- Pins
  - Different components created - Pins, search, Navbar, Feed , PinDetails
  - Creating Navbar with search
  - Creating Feed using React Masonry grid Layout
  - Crearing pins container to show all the pins
  - Creating Query from sanity to get pins of one category
- Pin
  - Getting image , title, description, tags, likes, comments, postedBy from sanity
  - Displaying all on a single pin
  - Attaching utils to the pin (delete, saved , url etc)

## Problems :-

- Saved pins not showing up
- Seach not working
- Polish CSS
