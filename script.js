// Define the topics and their corresponding descriptions
const topics = [
    {
        name: "AI and Technology",
        descriptions: [
            "Advocates for a comprehensive national strategy to ensure that artificial intelligence (AI) is developed and deployed responsibly, focusing on equity, accountability, and public safety in the technology sector.",
            "Emphasizes the need for aggressive measures to confront global competition in technology and innovation, promoting American leadership while prioritizing economic and national security."
        ]
    },
    {
        name: "China",
        descriptions: [
            "Calls for holding China accountable for human rights violations and unfair trade practices while promoting collaboration on global issues such as climate change and health security.",
            "Proposes a firm stance against China, including a focus on reducing the trade deficit and addressing issues related to intellectual property theft, viewing these actions as essential for protecting American interests."
        ]
    },
    {
        name: "Climate Change",
        descriptions: [
            "Recognizes climate change as a significant threat and advocates for rejoining the Paris Agreement, along with substantial investments in clean energy and infrastructure to combat the crisis.",
            "Challenges the consensus on climate change science and prioritizes domestic energy production, including fossil fuels, while advocating for policies that support economic growth."
        ]
    },
    {
        name: "Defense and NATO",
        descriptions: [
            "Supports multilateral cooperation and strengthening NATO, emphasizing commitment to allies and addressing contemporary security challenges, including cybersecurity.",
            "Critiques NATO and suggests reviewing financial commitments to the alliance while advocating for increased defense spending to counter threats from rival nations."
        ]
    },
    {
        name: "Global Health and Pandemic Prevention",
        descriptions: [
            "Emphasizes a commitment to strengthening public health systems and ensuring equitable access to healthcare, including reproductive rights and addressing the opioid epidemic.",
            "Prioritizes national interests in health policy and suggests reducing involvement in international health organizations while focusing on domestic health issues."
        ]
    },
    {
        name: "Immigration and Border Security",
        descriptions: [
            "Advocates for comprehensive immigration reform that addresses root causes of migration and provides pathways to citizenship, while ensuring humane treatment of immigrants.",
            "Focuses on stricter immigration enforcement, advocating for measures to reduce both legal and illegal immigration, and enhancing border security."
        ]
    },
    {
        name: "Inflation Debt and the Economy",
        descriptions: [
            "Promotes economic policies that invest in infrastructure, clean energy, and middle-class opportunities to foster equitable growth and reduce the national debt.",
            "Prioritizes tax cuts and deregulation to stimulate economic growth, emphasizing the need for significant cuts in government spending to address inflation."
        ]
    },
    {
        name: "Israel Gaza and the Middle East",
        descriptions: [
            "Supports a two-state solution and advocates for addressing humanitarian needs in Gaza while promoting diplomatic efforts for peace in the region.",
            "Emphasizes strong support for Israel, advocating for increased military assistance while adopting a hardline stance towards adversaries in the Middle East."
        ]
    },
    {
        name: "Russia-Ukraine",
        descriptions: [
            "Commits to supporting Ukraine in its defense against aggression through military aid and diplomatic channels, while promoting regional stability.",
            "Questions the continuation of U.S. aid to Ukraine, advocating for a more cautious approach to foreign engagements and prioritizing national interests."
        ]
    },
    {
        name: "Trade",
        descriptions: [
            "Advocates for rebalancing trade to support domestic manufacturing and protect American workers from unfair trade practices.",
            "Emphasizes a focus on confronting economic abuses from trading partners and prioritizing American manufacturing as a strategy to enhance economic strength."
        ]
    }
];

// Function to display topics
function displayTopics() {
    const container = document.getElementById('topic-container');
    topics.forEach((topic, index) => {
        const topicDiv = document.createElement('div');
        topicDiv.className = 'topic';
        topicDiv.innerHTML = `
            <h3>${topic.name}</h3>
            <label for="weight-${index}">Rate Importance (0-100):</label>
            <input type="number" id="weight-${index}" min="0" max="100" value="0" onchange="checkTotalWeight()">
            <div>
                <h4>Options:</h4>
                <div class="description" id="desc1-${index}" data-topic-index="${index}" data-option-index="0">${topic.descriptions[0]}</div>
                <div class="description" id="desc2-${index}" data-topic-index="${index}" data-option-index="1">${topic.descriptions[1]}</div>
            </div>
        `;
        container.appendChild(topicDiv);
    });
}

// Function to check if total importance exceeds 100
function checkTotalWeight() {
    let totalWeight = 0;

    // Sum up the values of all the input fields
    for (let i = 0; i < topics.length; i++) {
        const weight = parseInt(document.getElementById(`weight-${i}`).value) || 0;
        totalWeight += weight;
    }

    // Check if total weight exceeds 100
    if (totalWeight > 100) {
        alert(`Total importance cannot exceed 100! Please adjust your values. You have exceeded by ${totalWeight - 100}.`);

        // Disable further input if the limit is exceeded
        for (let i = 0; i < topics.length; i++) {
            document.getElementById(`weight-${i}`).disabled = true;
        }
    } else {
        // Re-enable inputs if total weight is under 100
        for (let i = 0; i < topics.length; i++) {
            document.getElementById(`weight-${i}`).disabled = false;
        }

        // Show remaining importance
        const remaining = 100 - totalWeight;
        document.getElementById('remaining-display').textContent = `You have ${remaining} importance points remaining.`;
    }
}

// Handle description selection
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('description')) {
        const topicIndex = event.target.dataset.topicIndex;
        const optionIndex = event.target.dataset.optionIndex;

        // Clear previous selections for this topic
        const descriptions = document.querySelectorAll(`.description[data-topic-index="${topicIndex}"]`);
        descriptions.forEach(desc => desc.classList.remove('selected'));

        // Highlight the selected description
        event.target.classList.add('selected');

        // Store the user's choice
        localStorage.setItem(`choice-${topicIndex}`, optionIndex);
    }
});

// Calculate scores based on selections
document.getElementById('calculate-btn').addEventListener('click', () => {
    let totalWeight = 0;
    let scoreU1 = 0; // Score for Kamala Harris
    let scoreU2 = 0; // Score for Donald Trump

    for (let i = 0; i < topics.length; i++) {
        const weight = parseInt(document.getElementById(`weight-${i}`).value) || 0;
        const choice = localStorage.getItem(`choice-${i}`);

        totalWeight += weight;

        if (choice === '0') {
            scoreU1 += weight; // Option 1 corresponds to Kamala Harris
        } else if (choice === '1') {
            scoreU2 += weight; // Option 2 corresponds to Donald Trump
        }
    }

    // Display the results
    document.getElementById('result-display').innerHTML = `
        <p>Score for Kamala Harris: ${scoreU1}</p>
        <p>Score for Donald Trump: ${scoreU2}</p>
    `;

    // Display images based on scores
    document.getElementById('img-u1').style.display = scoreU1 > scoreU2 ? 'block' : 'none';
    document.getElementById('img-u2').style.display = scoreU2 > scoreU1 ? 'block' : 'none';
});

// Initialize the display
displayTopics();

// Add remaining display to show how many importance points are left
document.body.insertAdjacentHTML('beforeend', '<p id="remaining-display">You have 100 importance points remaining.</p>');
