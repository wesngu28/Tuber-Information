# Tuber API Documentation
*Fill in a short description here about the API's purpose.*

## Tuber Display
**Request Format:** /foods

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Clicking the generate information button with tuber checked
generates text that will be displayed on the page.

**Error Handling:**
If an error somehow is triggered, the page will display:
'Could not retrieve tubers'.

## Vtuber Display
**Request Format:** /streamer

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Clicking the generate information button with vtuber checked
generates text that will be displayed on the page.

**Error Handling:**
If an error somehow is triggered, the page will display:
'Could not retrieve tubers'.

## Get Information
**Request Format:** /tuber/:name

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Clicking any of the images that are generated via the above
GET requests will send this get request to the API which returns a JSON that
will be used to populate the information card.

**Example Request:** /tuber/potato

**Example Response:**
```
{
  "name": "Potato",
  "scientificname": "Solanum tuberosum",
  "description": "The potato is a starchy tuber of the plant Solanum tuberosum and is a root vegetable native to the Americas. The plant is a perennial in the nightshade family Solanaceae. Wild potato species can be found throughout the Americas, from Canada to southern Chile. The potato was originally believed to have been domesticated by Native Americans independently in multiple locations, but later genetic studies traced a single origin, in the area of present-day southern Peru and extreme northwestern Bolivia. Potatoes were domesticated there approximately 7,000-10,000 years ago, from a species in the Solanum brevicaule complex. Potatoes were introduced to Europe from the Americas in the second half of the 16th century by the Spanish. Today they are a staple food in many parts of the world and an integral part of much of the world's food supply. As of 2014, potatoes were the world's fourth-largest food crop after maize (corn), wheat, and rice. Following millennia of selective breeding, there are now over 5,000 different types of potatoes. Over 99% of potatoes presently cultivated worldwide descended from varieties that originated in the lowlands of south-central Chile.",
  "recipe": ""
}
```

**Error Handling:**
An error should not trigger because there is no text input, but it would display
Could not get information for potato, in the above example.