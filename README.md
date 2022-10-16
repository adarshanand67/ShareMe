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
- Customize the tailwind.config.js to
- Add lots of packages (React Icons, React Google Login, ...)
- Working on Login page
  - Tailwind CSS Customizations
  - Adding video with dark overlay + controls
  - Integrating Google login and getting (name,email,picture) from the response
  - Adding all the users to sanity collection
  - Redirecting to the homepage once logged in
  -

