async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇

  try {
    /// Fetch user and mentor data concurrently
    const [userData, mentorData] = await Promise.all([
      axios.get('http://localhost:3003/api/learners'),
      axios.get('http://localhost:3003/api/mentors')
    ]);


    /// Extracting data arrays from the reponses
    const userAllData = userData.data;
    const mentorAllData = mentorData.data;

    //// log user and mentor data to the console
    console.log('User', userAllData);
    console.log('Mentors', mentorAllData);

        //// Select the cards container element
        const cards = document.querySelector('.cards');
        console.log('Empty cards right now!', cards);
    
        /// Iterate over each user data
        userAllData.forEach((userData) => {
          /// create a new card for each user
          const cardSelected = document.createElement('div');
          cards.appendChild(cardSelected);
          cardSelected.classList.add('card', 'selected');

                //// create elements for user information
      const nameAndId = document.createElement('h3');
      nameAndId.textContent = `${userData.fullName} ID: ${userData.id}`;

      const email = document.createElement('div');
      email.textContent = `${userData.email}`;

      /// Append user information to the cared
      cardSelected.appendChild(nameAndId);
      cardSelected.appendChild(email);
  
} catch (err) {
  /// log error if fetching data fails
  console.error('Error fetching data: ', err.message);
}
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
