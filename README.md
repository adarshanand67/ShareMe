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
-

## Screenshots 📷

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

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

## Lessons Learned 📝

What did you learn while building this project? What challenges did you face and how did you overcome them?

- Learnt ...

## Current Problems to solve :- 🔧

- [ ] Change icons of Saving Pins
- [ ] Handle empty url
- [ ] Finish video
- [ ] Handle empty url of images
- [ ] CI/CD Deployment (Proper)
- [ ] Change icons of Saving Pins

## Future Improvements TODO :- 🔧

### Easy Changes

- [ ] Write the entire flow of the application
- [ ] Improve github readme
- [ ] Add Github, Facebook, Twitter login options
- [ ] Create a beautiful login page like Pini
- [ ] Light/Dark Mode Addition
- [ ] Showing confetti on login, creating a pin
- [ ] Contact us section
- [ ] Cutomer feedback section

### Medium Changes

- [ ] Show tags on posts
- [ ] Scanning QR Code to open website on mobile
- [ ] Adding Share Button (Share Pin to Whatsapp, Twitter, Email)
- [ ] Pressing enter should simulate button click
- [ ] Smooth + Infinite Scrolling
- [ ] Showing toasts when post saved

### Advanced Changes

- [ ] Ability to follow other users
- [ ] Creating a notification system when new user uploads a post
- [ ] Ability to upload videos instead of images
- [ ] Adding feature like pin (Store count of likes)
- [ ] Creating a guided tour of app
- [ ] Improve the saved Features
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
- [Practical React Learning](https://www.youtube.com/watch?v=XxXyfkrP298)
- [React Docs](https://reactjs.org/docs/getting-started.html)
