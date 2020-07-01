import { IFormState, IQuestionInfo } from '../components/MultiStepForm/MultiStepForm'

export function pizzaQuiz(currentState: IQuestionInfo[]): IFormState {
  if (currentState.length < 3) {
    return {
      progress: 0,
      questions: [
        {
          id: 0,
          label: 'What is your favorite country?',
          type: 'text',
          value: '',
          options: [],
        },
        {
          id: 1,
          label: 'Which vegetable is your favorite?',
          type: 'select',
          value: '',
          options: ['Peas', 'Broccoli', 'Celery', 'Carrot'],
        },
        {
          id: 2,
          label: 'Which Mario characters have you played in Mario Cart?',
          type: 'multiselect',
          value: '',
          options: ['Mario', 'Luigi', 'Peach', 'Bowser'],
        },
      ]
    }
  } else if (currentState.length >=3 && currentState.length < 6) {
    return {
      progress: 33.33,
      questions: [
        {
          id: 3,
          label: 'Are you a good cook?',
          type: 'select',
          value: '',
          options: ['The Best', 'Above Average', 'I Know Some Things', 'Awful'],
        },
        {
          id: 4,
          label: 'Which fruit is your favorite?',
          type: 'select',
          value: '',
          options: ['Pineapple', 'Apple', 'Orange', 'Pear'],
        },
        {
          id: 5,
          label: 'How hungry are you?',
          type: 'select',
          value: '',
          options: ['Very', 'Quite', 'A Bit', 'Not Really'],
        },
      ]
    }
  } else if (currentState.length >= 6 && currentState.length < 9) {
    return {
      progress: 66.66,
      questions: [
        {
          id: 6,
          label: 'Does pizza make you happy?',
          type: 'select',
          value: '',
          options: ['Yes', 'Sometimes', 'Usually', 'Nope'],
        },
        {
          id: 7,
          label: 'When did you first eat pizza?',
          type: 'select',
          value: '',
          options: ['Before 3 years old', 'Before 6 years old', 'Before 9 year old', 'After 9 years old'],
        },
        {
          id: 8,
          label: 'How hungry are you really?',
          type: 'select',
          value: '',
          options: ['Very', 'Quite', 'A Bit', 'Not Really'],
        },
      ]
    }
  } else if (currentState.length >= 9) {
    return {
      progress: 100,
      questions: []
    }
  }
  return {
    progress: -1,
    questions: [],
  }
}