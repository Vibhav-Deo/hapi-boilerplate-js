const Boom = require('@hapi/boom');
const sendError = (error) => {
  if (Boom.isBoom(error)) {
    return error;
  }
  if (error.name === 'MongooseError') {
    return Boom.boomify(error);
  }
};

const sendSuccess = (data, message) => {
  if (typeof message === 'string' || message instanceof String) {
    return {
      statusCode: 200,
      message: message,
      data: data,
    };
  }
  return {
    ...message,
    data: data,
  };
};

const generateRandomString = () => {
  let randomString = '';
  const upperCaseLetters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  const lowerCaseLetters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  for (let i = 0; i < 10; i++) {
    let randomNumber = Math.floor(Math.random() * 10);
    let randomNumber1 = Math.floor(Math.random() * 10);
    let randomNumber2 = Math.floor(Math.random() * 10);
    randomString =
      randomString +
      upperCaseLetters[randomNumber] +
      lowerCaseLetters[randomNumber1] +
      numbers[randomNumber2];
  }
  return randomString.toString();
};

module.exports = {
  sendError: sendError,
  sendSuccess: sendSuccess,
  generateRandomString: generateRandomString
}