
// /// Asynchronous function for the sprint challenge

async function sprintChallenge5() {
  try {
    /// Fetch user and mentor data concurrently
    const [userData, mentorData] = await Promise.all([
      axios.get('http://localhost:3003/api/learners'),
      axios.get('http://localhost:3003/api/mentors')
    ]);

    /// Extracting data arrays from the reponses
    const learners = userData.data;
    const mentorAllData = mentorData.data;

    //// log user and mentor data to the console
    console.log('User', learners);
    console.log('Mentors', mentorAllData);

    //// Select the cards container element
    const cards = document.querySelector('.cards');
    console.log('Empty cards right now!', cards);

    /// Iterate over each user data
    learners.forEach((userData) => {
      /// create a new card for each user
      const cardSelected = document.createElement('div');
      cards.appendChild(cardSelected);
      cardSelected.classList.add('card');

      //// create elements for user information
      const nameAndId = document.createElement('h4');
      nameAndId.textContent = `${userData.fullName} ID: ${userData.id}`;

      const email = document.createElement('div');
      email.textContent = `${userData.email}`;

      /// Append user information to the cared
      cardSelected.appendChild(nameAndId);
      cardSelected.appendChild(email);


      /// Create elements for mentor section
      const mentorSection = document.createElement('div');
      cardSelected.appendChild(mentorSection);
  
      const mentorName = document.createElement('h4');
      mentorName.textContent = 'Mentors';
      mentorName.classList.add('closed');
      mentorSection.appendChild(mentorName);
  
      const unOrderList = document.createElement('ul');
      mentorSection.appendChild(unOrderList);

    ///   const selectLearner = document.createElement('p');
    // /selectLearner.classList.add('selectedStatus');


      // Add this line at the beginning to get a reference to the status element
const selectedStatus = document.querySelector('.info');


cardSelected.addEventListener('click', evt => {

  //// selectedStatus.textContent = 'No learner is selected.' 
  //// Remove 'selected' class from all cards
  document.querySelectorAll('.card.selected').forEach(card => {
    card.classList.remove('selected');
  });

  //// Add 'selected' class to the clicked card
  cardSelected.classList.add('selected');

  //// Update the selected status text
   selectedStatus.querySelector('h3')
   selectedStatus.textContent = `The selected learner is ${userData.fullName}`;
  
});


      //// userData is learners from api and mentors is the mentors inside the learners array. mentorAllData is the mentors data from the api. here I am muching the mentors id to the learners's mentor id.
      const mentorsForUser = userData.mentors.map(mentorId => mentorAllData.find(mentor => mentor.id === mentorId))
      // console.log('FavMentorsssss', mentorsForUser);

      renderMentors(mentorsForUser, unOrderList, mentorName);
     
    });

  } catch (err) {
    /// log error if fetching data fails
    console.error('Error fetching data: ', err.message);
  }

  //// set the footer content with the current year
  const footer = document.querySelector('footer');
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;
}

////
////  function to render mentors in the list container with toggle functionality
function renderMentors(mentors, listContainer, mentorName) {
  /// Iterate over each mentor data
  mentors.forEach((mentorData) => {
    
    //// create a list item for each mentor
    const listItem = document.createElement('li');
    listItem.textContent = `${mentorData.firstName} ${mentorData.lastName}`;
    listContainer.appendChild(listItem);
  });

  /// Add click event listerner to toggle open/ close state
  mentorName.addEventListener('click', () => {
    mentorName.classList.toggle('open');
    mentorName.classList.toggle('close');
    listContainer.style.display = mentorName.classList.contains('open') ? 'block' : 'none';
  });

  
}


function getWeather(){
  return new Promise(function(resolve, reject){
    resolve('Sunny')
  })
}

function onSucces(succes){
  console.log(`The weather is: ${succes}`)
}
function onError(error){
  console.log(`Error${error}`)
}

getWeather().then(onSucces, onError)


// ❗ DO NOT CHANGE THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 };
else sprintChallenge5();