# Brief

To create a simple CV project using React, relying on class-based components for purposes of state.

## Note

Normally I would have begun with a summary of what I intended, but this was actually an experiment which ended up becoming my final version. For _usability_, my first version involved a 'double-click to edit' CV in which the 'rendered' version was editable. However, I realised that in terms of _accessibility_ it would probably be very bad practice to have form elements toggling between `<p>` and `<input>` for those using assistive browsing. Also, the ability to tab through a form would be missing, essential for assistive technologies.

On the other hand, looking at some other student examples, I felt that the format of the form was very overwhelming - one big form, able to add places of study and employment indefinitely, creating a long and intimidating form which could be full of holes and require endless scrolling and rechecking. As such, I made two core decisions:

1. To break the form down in to individual sections submitted when advancing to the next section, and
2. A basic check which **only allows advancement to the next page of the form if all fields are filled**.

As such, the form could be approached in stages, and the user couldn't end up with 'holes' they have to track down later.

## If time was infinite

As always, I'm ending the project when I feel that the main 'learning' has taken place, and what's left is polish. Because this exercise took multiple attempts, I'm also aware that the code could do with a lot of neatening, which I may come back and do at a later point. As things stand, I'm too eager to advance and finally learn about React hooks(!)

Things which require more work:

- Making the page responsive (currently just a desktop app)
- Further CV formatting (for a more professional-looking render)
- Cleaning code

Features I would have loved to add if this was a final project:

- _About Me_ should contain basic key skills, perhaps selectable from a list, which can render with icons in a sidebar. There could also be a paragraph for a personal statement.
- I wanted the contact input to be a basic box in to which you could put any contact details, which would then be checked on `onBlur` to determine whether the details were a phone number, email address, website, LinkedIn page etc. and label/render appropriately.
- The left navigation list was meant to be a set of links to navigate quickly through the form. However, as I was trying to keep to my 2nd decision above that a form page can only be left if it is complete, it would mean that clicking on each side-bar link would force a form submit, something I couldn't work out how to make happen without a DOM query (when I thought that the whole 'spirit' of React is to have separate independent UI modules).
- The list should also change colour based on which pages were complete, with the currently-displayed page in bold etc.
- The date fields for education and experience should really be `new Date()`, perhaps with a date input, but I personally dislike when forms force me to input dates with a calendar (navigating back 10 years always feels time consuming, and forcing me to put an exact date when 'September 2004' or even '2004' would be more appropriate). Were this change made, however, it would mean that experiences and education could be rearranged by oldest to most recent, vice versa, by duration etc.
- Education and experience should be able to be reversed on the CV.
- Maybe there could be a simple string of buttons on the CV render page allowing a choice of 3-6 basic fonts, or even some basic colour schemes.

## Questions remaining

Being my first experience with React, I have many questions I hope will be answered later:

- Instead of passing down `this.state` in props, wouldn't it be better (as I tried to do in this exercise) to instead call a function which returns a _new_ object only containing the required properties (increasing immutability of state)?
- Is there a more efficient way of having the page understand whether there are any unfilled fields than a function which checks all of state for App.js upon every edit?
- Is it better to style components individually (so that parent components need have no knowledge of what types of HTML elements they contain) or via their parent component's stylesheet (so that the same sub-component can be inserted on different pages with different 'themes' and appear appropriately styled for each)? I ended up doing a bit of both for this project.
