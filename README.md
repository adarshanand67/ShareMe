# ShareMe 😄

## Flow of the application

### Backend using sanity.io

- Using sanity studio to create the schemas (database)
- Creating schemas (blueprint of the content)
  - For creating users (By userName and Image)
  - For Creating Pins (Title,About, Destination, Category, Image, UserID, PostedBy, Save, Comments)
  - Saving Posts
  - Adding comments

### Frontend using React + Tailwind CSS

- Setup the project using create-react-app from Tailwind website
- package.json
  - sanity client , sanity image url
  - react-router-dom
  - react-icons
  - react-masonry-css
  - react-spinners
  - Chakra UI - Toast
- Login
  - Adding video with dark overlay + controls
  - Firebase integration - Google + Github
  - Adding newly created users on sanity db
  - Check if user already logged in
  - Redirecting to the homepage once logged in
  - Adding Typed.js Animations
- Sidebar
  - Link vs NavLink
  - User attributes naming convention
  - Listing all categories
  - Go to userProfile Button
- Pins container
  - Setting up entire routes of the application (react-router-dom)
- Navbar
  - Adding search bar fuzzy searching functionality
  - Create new Post option
  - UserProfile page
- Feed
  - Queries to get all the pins from sanity
  - Fetch category feed when category selected
  - Conditional rendering if no pins found
- PinDetails
  - Layout of the pinDetails on clicking a pin
  - Showing Image, Title, About, Link, Category, Download button, PostedBy
  - Adding comment section for all users
- Creating Pin
  - Utility of Creating pin
  - Upload Image url, title, about , destination, category
  - Create Pin Button writes to sanity db and redirects to the homepage
- Pin
  - Query image , title, description, tags, likes, comments, postedBy from sanity
  - Attaching utils to the pin (delete, saved , url ) on hover
  - Showing the user who posted it
- UserProfile
  - Fetch the details of user
  - Show all the created and save Posts
  - Firebase Logout button
  - Conditional rendering if no pins found
- SocialMediaButtons
  - Layout of the social media buttons
  - Share the URL To social media sites
- Spinner
  - Showing the spinner component when isLoading is true
- Icons
  - Email Me Icon, redirect to contact page
- index.js
  - Having all the exports t once place
- Contact
  - Showing Contact us page setup using EmailJS
- MasonryLayout
  - Displaying all the pins in Masonry format
  - Varying Vertical sizes
- QRCode
  - Showing QR Code of current website
  - Login using mobile
- Search
  - Fuzzy search for posts
  - Queries the rendered pins and returns pins matching title

<!-- ## Screenshots 📷 -->

<!-- ![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here) -->

## Run Locally 🚀

Clone the project

```bash
  git clone https://github.com/adarshanand67/ShareMe
```

Go to the frontend directory

```bash
  cd shareme-frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

<!-- ## Lessons Learned 📝

What did you learn while building this project? What challenges did you face and how did you overcome them?

- Learnt bla bla... -->

## Current Problems :- 🔧

- [x] Handle empty url of images
- [x] Categories not loading
- [x] Category search not working
<!-- - [ ] Change icons of Saving Pins -->
- [x] Error in userProfile saved pins
<!-- - [ ] Deleting Comments by users -->

## Future Improvements TODO :- 🔧

### Easy Changes

- [x] Improve github readme
- [x] Write the entire flow of the application
- [x] Add Github Auth
- [x] Add Typed JS Animations
- [x] Create customized login page
- [ ] Light/Dark Mode Addition
- [x] Adding Toasts while login/logout
- [x] Changing highlight color
<!-- - [ ] Showing confetti animation, creating a pin -->
- [x] Contact us section in
- [x] Confirmations popups
<!-- - [ ] Cutomer feedback section -->

### Medium Changes

- [x] Scanning QR Code to open website on mobile
- [x] Adding Share Button (Share Pin to Whatsapp, Twitter, Email)
- [x] Pressing enter should simulate button click
- [x] Show tags on posts
- [x] Infinite Scrolling
- [x] Showing toasts when post saved
- [ ] Create Progressive Web App
- [x] Minify bundle size
- [ ] Pre commit lint staging

### Advanced Changes

- [ ] Ability to follow other users
- [ ] Creating a notification system when new user uploads a post
<!-- - [ ] Ability to upload videos instead of images (Not possible) -->
- [ ] Adding feature like pin (Store count of likes)
- [ ] Creating a guided tour of app
- [x] Improve the saved Features
- [ ] Writing unit tests using React Testing Library

## Feedback 📝

If you have any feedback, please reach out to us at 📫 adarsh.anand.20031@iitgoa.ac.in.

## Contributing 🤝

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License 📜

[MIT](https://choosealicense.com/licenses/mit/)

## Authors 👨‍💻

| [<img src="https://github.com/AdarshAnand67.png?size=115" width=115><br><sub>@AdarshAnand67</sub>](https://github.com/AdarshAnand67) |
| :----------------------------------------------------------------------------------------------------------------------------------: |

## Acknowledgements 🙏

- [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
- [React Docs](https://reactjs.org/docs/getting-started.html)
- [Firebase Docs](https://firebase.google.com/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
