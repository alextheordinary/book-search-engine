import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
 mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
      username
    }
  }
}
`;

export const ADD_USER = gql`
 mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      bookCount
      email
      username
    }
  }
}
`;

export const SAVE_BOOK = gql`
 mutation saveBook($input: BookInput) {
  saveBook(input: $input) {
    _id
    email
    username
    bookCount
    savedBooks {
      bookId
      title
      authors
      description
      image
      link
    }
  }
}
`;

export const REMOVE_BOOK = gql`
 mutation removeBook($bookId: String!) {
  removeBook(bookId: $bookId) {
    _id
    bookCount
    email
    username
    savedBooks {
      authors
      bookId
      description
      image
      link
      title
    }
  }
} 
`;