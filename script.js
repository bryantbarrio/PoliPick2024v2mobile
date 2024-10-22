// Define the topics and their corresponding descriptions
const topics = [
    {
        name: "AI and Technology",
        descriptions: [
            "There is a strong emphasis on the need for a federal approach to ensure that companies use AI tools responsibly. This perspective advocates for the creation of regulatory frameworks to prevent misuse and protect public interests while managing and slowing down advancements in AI and related technologies from competing nations, focusing on national security and economic competitiveness.",
            "The introduction of national strategies for addressing emerging technologies, such as AI and cybersecurity, is viewed as essential for safeguarding national interests. This view frames the development of AI as an arms race with rival nations, underscoring a sense of urgency and competition. Additionally, concerns have been raised regarding the influence of major tech companies, highlighting a complicated relationship between the government and private entities in the technology sector."
        ]
    },
    {
        name: "China",
        descriptions: [
            "The United States needs to hold China accountable for human rights violations and distortions in the global economy, while also emphasizing the importance of collaboration on transnational challenges. This perspective advocates for a balanced approach, recognizing that cooperation is necessary in areas of mutual concern despite significant tensions.",
            "There is a call for aggressive action to confront China regarding what are perceived as economic abuses. This view emphasizes the need to protect American workers and reduce the large bilateral trade deficit with China, suggesting that a more confrontational stance is essential for addressing these issues."
        ]
    },
    {
        name: "Climate Change",
        descriptions: [
            "The climate crisis is an “existential threat” to humanity. There has been strong support for policies that rejoin international agreements like the Paris Agreement and efforts to pass significant clean energy and climate investment legislation.",
            "Skepticism about the science of climate change is prevalent, with pledges to expand domestic fossil fuel production and overhaul current clean energy initiatives, including withdrawing from major global climate efforts."
        ]
    },
    {
        name: "Defense and NATO",
        descriptions: [
            "Support for multilateral cooperation and the North Atlantic Treaty Organization (NATO) has been emphasized, along with a commitment to Ukraine and advancements in domestic space policy.",
            "Criticism of NATO has been prevalent, with threats to withdraw from the alliance and significant increases in defense spending focused on countering threats from China and Russia."
        ]
    },
    {
        name: "Global Health and Pandemic Prevention",
        descriptions: [
            "There has been a strong focus on national and international health-care issues, including support for reproductive rights and addressing the opioid epidemic.",
            "Leadership during the COVID-19 pandemic included massive economic stimulus and the development of a vaccine, coupled with a withdrawal from the WHO and restrictions on abortion-related funding."
        ]
    },
    {
        name: "Immigration and Border Security",
        descriptions: [
            "Advocacy for comprehensive immigration reform is prominent, including efforts to address root causes of migration, though some statements have sparked controversy.",
            "Immigration remains a key issue, with commitments to reduce both legal and illegal immigration and reshape asylum, border, and deportation policies."
        ]
    },
    {
        name: "Inflation Debt and the Economy",
        descriptions: [
            "Economic policy focuses on creating opportunities for the middle class through public investments in infrastructure and green energy, as well as challenging monopolistic practices.",
            "Emphasis has been placed on tax cuts and deregulation to stimulate growth, with calls for massive cuts in government spending to combat inflation."
        ]
    },
    {
        name: "Israel Gaza and the Middle East",
        descriptions: [
            "Support for cease-fires and solutions to the Israeli-Palestinian conflict includes advocating for a two-state solution and restrictions on arms sales to certain countries.",
            "A strong alignment with Israel and Saudi Arabia is emphasized, coupled with a confrontational stance toward Iran and reluctance to support a separate Palestinian state."
        ]
    },
    {
        name: "Russia-Ukraine",
        descriptions: [
            "There is a commitment to support Ukraine against Russia’s aggression, including financial assistance and participation in peace talks.",
            "Doubts have been expressed regarding the continuation of U.S. aid to Ukraine, alongside a history of warmer relations with Russia."
        ]
    },
    {
        name: "Trade",
        descriptions: [
            "A focus on rebalancing trade towards domestic production is emphasized, with critiques of the global trading system as rigged against U.S. interests.",
            "An emphasis on confronting economic abuses and a commitment to transforming the U.S. into a manufacturing superpower are key components."
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