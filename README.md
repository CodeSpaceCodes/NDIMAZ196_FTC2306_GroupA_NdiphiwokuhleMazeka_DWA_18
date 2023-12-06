# Podcast App

## Introduction
This project is a podcast app that allows users to browse various podcast shows, play episodes, and track their favorite episodes.

### The project involves three basic semantic units:

- Episode: Corresponds to a specific MP3 file that a user can listen to.
- Season: A collection of episodes released across a specific timespan.
- Show: A specific podcast that contains one or several seasons.

## Technology
- React.js + Vite
- VSC IDE

## Endpoints

### Data can be fetched via two endpoints:

-    https://podcast-api.netlify.app/shows: Returns an array of preview objects.
-    https://podcast-api.netlify.app/id/<ID>: Returns a single show object with embedded season and episode objects.

### Relationships

- The data used in this project is related:

    One or more episodes make up a season.
    One or more seasons make up a show.
    Shows and previews are different forms of the same data.
    Shows and previews both have a genre property.

## User Stories

### The project aims to meets the following requirements:

-    Deployed to a custom Netlify URL.
     Responsive design for all views, verified on the smallest mobile device.
     Favicon and metatag information added correctly.
     Various functionalities related to browsing shows, viewing details, listening to episodes, and managing favorites.

-    Additional Features

     User authentication via Supabase.
     Storage of user favorites in the Supabase database.
     Automatic syncing of user favorites when logged in, ensuring consistency between devices.
     Ability for users to share their favorites via a publicly accessible URL.