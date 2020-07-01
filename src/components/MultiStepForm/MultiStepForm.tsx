import React, { useEffect, useState } from 'react';

interface Props {
  name: string;
  getNextState: (currentState: IQuestionInfo[]) => IFormState;
  onComplete: (response: IQuestionInfo[]) => void;
}

export interface IQuestionInfo {
  id: number;
  label: string;
  type: string;
  value?: string | string[];
  options: string[];
}

export interface IFormState {
  progress: number,
  questions: IQuestionInfo[],
}

const INPUT_TYPE_OPTIONS = ['text', 'select', 'multiselect'];
const MULTI_FORM_BASE_COOKIE_NAME = 'multi-form'

export function ClearForm(name: string) {
  const storageKey: string = `${MULTI_FORM_BASE_COOKIE_NAME}-${name}`;
  localStorage.removeItem(storageKey);
}
  
export default function MultiStepForm(props: Props) {
  const storageKey: string = `${MULTI_FORM_BASE_COOKIE_NAME}-${props.name}`;
  const [pastData, setPastData] = useState<IQuestionInfo[]>([]);
  const [formState, setFormState] = useState<IFormState | undefined>();

  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);
    if (savedData != null) {
      setPastData(JSON.parse(atob(savedData)));
    }
  }, [storageKey]);

  useEffect(() => {
    const nextState = props.getNextState(pastData);
    if (nextState.progress === 100) {
      props.onComplete(pastData);
    }
    setFormState(nextState);
  }, [pastData, props.getNextState])

  const updateQuestion = (value: string | string[], question: IQuestionInfo, index: number) => {
    if (formState == null) {
      return // Should never happen
    }
    let newQuestion = {...question};
    newQuestion.value = value;
    let newFormStateQuestions = [...formState.questions];
    newFormStateQuestions.splice(index, 1, newQuestion);
    setFormState({
      ...formState,
      questions: newFormStateQuestions,
    });
  };

  const onMultiselectChange = (option: string, question: IQuestionInfo, index: number) => {
    let newValue: string[] = [];
    if (Array.isArray(question.value)) {
      newValue = [...question.value];
    }

    const valueIndex = newValue.indexOf(option);
    if (valueIndex < 0) {
      newValue?.push(option);
    } else {
      newValue?.splice(valueIndex, 1);
    }
    updateQuestion(newValue, question, index)
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (formState == null) {
      return // Should never happen
    }
    const newPastData = [...pastData, ...formState.questions]
    localStorage.setItem(storageKey, btoa(JSON.stringify(newPastData)));
    setPastData(newPastData);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {formState && formState.questions.map((question, idx) => (
          <div key={question.id}>
            <label>{question.label}</label>
            {INPUT_TYPE_OPTIONS.indexOf(question.type) < 0 && (
              <p>Unknown Input Type</p>
            )}
            {question.type === 'text' && (
              <input
                type='text'
                value={question.value}
                onChange={(e) => updateQuestion(e.target.value, question, idx)}/>
            )}
            {/* Couldn't get typescript to acception "'options' in question" as a valid check for
                question.options existing as it probably should be optional*/}
            {question.type === 'select' && 'options' in question && question.options.map((option, jdx) => (
              <div key={jdx}>
                <input
                  type='radio'
                  checked={question.value === option}
                  onChange={() => updateQuestion(option, question, idx)}
                />
                <span>{option}</span>
              </div>
            ))}
            {question.type === 'multiselect' && 'options' in question && question.options.map((option, jdx) => (
              <div key={jdx}>
                <input
                  type='checkbox'
                  checked={!!question.value && question.value.indexOf(option) >= 0}
                  onChange={() => onMultiselectChange(option, question, idx)}
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        ))}
        <input type='submit' value='Submit'/>
      </form>
    </div>
  );
}