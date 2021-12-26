// leovilleri LLC, 2021
// All code in this document is free to use in Google Apps Script.


/**
 * Returns a card with just a picture.
 * 
 * @param {string} picture Picture for the card.
 */
function picturecard(picture) {
  var card = {
    cards: [
      {
        sections: [
          {
            widgets: [
              {
                image: {
                  imageUrl: picture
                }
              }
            ]
          }
        ]
      }
    ]
  }
  return card
}

/**
 * Returns a card with just a title.
 * 
 * @param {string} title Title for the card.
 */
function titlecard(title) {
  var card = {
    cards: [
      {
        header: {
          title: title
        }
      }
    ]
  }
  return card
}


/**
 * Returns a small card.
 * 
 * @param {string} top Title for the card.
 * @param {string} txt Subtitle
 */
function smallcard(top, txt) {
  var card = {
    cards: [
      {
        header: {
          title: top,
          subtitle: txt
        }
      }
    ]
  }
  return card
}


/**
 * Returns a card with information (no subtitle).
 * 
 * @param {string} top The title of the card.
 * @param {string} txt The content of the card.
 */
function infcard(top, txt) {
  var card = {
    cards: [
      {
        header: {
          title: top,
          },
          sections: [
            {
              widgets: [
                {
                  textParagraph: {
                    text: txt
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  return card
}


/**
 * Returns a small card with more information.
 * 
 * @param {string} top The title of the card.
 * @param {string} mid The subtitle of the card.
 * @param {string} txt The content of the card.
 */
function smallinfcard(top, mid, txt) {
  var card = {
    cards: [
      {
        header: {
          title: top,
          subtitle: mid
          },
          sections: [
            {
              widgets: [
                {
                  textParagraph: {
                    text: txt
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  return card
}


/**
 * Returns a card with one button directing to a link.
 * 
 * @param {string} button The name for the button.
 * @param {string} link The link the button will redirect to.
 */

function buttonCard(button, link) {
  var card = {
    cards: [
      {
        sections: [
          {
            widgets: [
              {
                buttons: [
                  {
                    textButton: {
                      text: button,
                      onClick: {
                        openLink: {
                          url: link
                        }
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  return card
}


/**
 * Restricts a command to one user.
 * 
 * @param {Object} space_check ONLY event.space.type
 * @param {Object} username ONLY event.user.displayName
 * @param {string} alloweduser The user who can use the command (display name).
 * @param {JSON} allowedtext The output returned to the allowed user (JSON format). 
 */
function restricted1(space_check, username, alloweduser, allowedtext) {
  if (username == alloweduser && space_check == "DM") {
    return allowedtext
  } else if (event.space.type == "DM") {
    return smallcard("⛔ UNAUTHORIZED", "Unauthorized access!!!", "This command is not allowed for the current user.")
  } else {
    return smallcard("⛔ UNAUTHORIZED", "Unauthorized access!!!", "This command can only be used in drect messages to the bot.")
  }
}


/**
 * Returns a "Currently unavailable" message.
 */
function tyl() {
  var message = { "text": "❌ Currently unavailable, please try again later." }
  return message
}


/**
 * Returns what the user said.
 * 
 * @param {Object} space MUST BE event.space.type
 * @param {Object} user MUST BE event.user.displayName
 * @param {Object} text MUST BE event.message.text
 */
function youSaid(space, user, text) {
  if (space == "DM") {
    name = "You";
  } else {
    name = user
  }
  var message = name + "said \"" + text + "\"";
  return { "text": message }
}


/**
 * Returns a random number
 * 
 * @param {number} min Lowest possible random number.
 * @param {number} max Maximum possible random number.
 */
function randomint(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Finds if message matches with command.
 * 
 * @param {Object} emt MUST BE event.message.text
 * @param {string} name Name (with an \@) of the subject.
 * @param {string} content Command in question.
 */
function tMatch(emt, name, content) {
  if (emt == content || emt == name + " " + content) {
    return true
  }
}


/**
 * Returns value for a user in a very specific type of array (must be 2D)
 * 
 * @param {Object} user MUST BE event.message.sender.name OR event.message.sender.displayName (depending on organization type)
 * @param {string[]} list The 2D list to check information
 * @param {number} number1 The row with person names/user IDs
 * @param {number} number2 The row with the information for outputting.
 */
function returnArrayUser(user, list, number1=0, number2) {
  var user_index = list[number1].indexOf(user)
  if (user_index == -1) {
    return -1
  }
  var user_answer = list[number2][user_index]
  return user_answer
}


/**
 * Finds if message starts with specific characters
 * 
 * @param {Object} emt MUST BE event.message.text
 * @param {string} name The name of the bot (with an \@)
 * @param {string} command The command to check for in the beginning.
 */
function tMatchStart(emt, name, command) {
  if (emt.startsWith(command) || emt.startsWith(name + " " + command)) {
    return true
  }
}

/**
 * Returns text after the command given.
 * 
 * @param {string} text The text
 * @param {string} name The bot name
 * @param {string} command The command
 */
function removeCommandFT(text, name, command) {
  text = text.replace(name + " " + command + " ", "")
  text = text.replace(name + " " + command, "")
  text = text.replace(name + " ", "")
  text = text.replace(command + " ", "")
  text = text.replace(command, "")
  return text
}
