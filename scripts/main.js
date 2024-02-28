const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};


function updateTime (){
  var currentTime = new Date()
  var timeStamp = currentTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
  var dateStamp = currentTime.toLocaleString("en-US", options)
  const time = document.querySelector('.time_section')
  time.innerHTML = timeStamp
  const date = document.querySelector('.date_section')
  date.innerHTML = dateStamp
}


setInterval(updateTime, 1000);

updateTime()



async function fetchPRs() {
  try {
    const response = await fetch("https://api.github.com/repos/CodingChallegesFYI/SharedSolutions/pulls");

    // Check if response is successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }

    const pullRequests = await response.json();
    const pullRequestsCounter = document.querySelector(".pullRequestHeader");
    pullRequestsCounter.textContent = `There are ${pullRequests.length} PRs open for Shared Solutions:`;
    const prList = document.querySelector(".pullRequestsList");
    pullRequests.forEach((pr, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${pr.title}`;
      prList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching PRs:", error);
    // Handle the error here, e.g., display an error message to the user
    const pullRequestsCounter = document.getElementById(".pullRequestHeader");
    pullRequestsCounter.textContent = "Error fetching PRs.";
  }
}

fetchPRs();
