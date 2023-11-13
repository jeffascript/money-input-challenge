import { Meta, StoryObj } from '@storybook/react'
import MoneyInput from './MoneyInput'
import { useState } from 'react'
import { InputWrapper } from './wrapper'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/MoneyInput',
  component: MoneyInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    vitest: {
      testFile: 'MoneyInput.test.tsx',
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onChange: {
      description: '(value: number | null) => void',
    },
    onBlur: {
      description: '() => void',
    },
    as: {
      control: { type: 'none' },
      description: 'Input another component with the element type',
      table: {
        defaultValue: { summary: 'input' },
      },
    },
  },
} satisfies Meta<typeof MoneyInput>

const specificArgs = {
  value: {
    control: { type: 'number' },
    description: 'Controlled component amount in cents',
  },
  locale: {
    description: 'To format the number with the specified locale',
    options: ['en', 'de', 'ja-JP', 'fr-FR'],
    control: { type: 'select' },
    table: {
      defaultValue: { summary: 'de' },
    },
  },
  disabled: {
    description: 'Disable or enable the component',
    options: [true, false],
    control: { type: 'boolean' },
  },
  isError: {
    description: 'Show that there is an error',
    options: [true, false],
    control: { type: 'boolean' },
  },
  showWithCurrency: {
    description: 'Show formatted number as currency based on chosen locale ',
  },
}

// Default MoneyInput Component without styling, just functionality.
export const Default: StoryObj<typeof MoneyInput> = {
  render: (args) => <MoneyInput {...args} />,
  argTypes: {
    ...specificArgs,
  },
  args: {
    locale: 'de',
  },
}

// The example of MoneyInput component using InputWrapper component AS a prop. InputWrapper is styled with CSS
export const WithWrapper: StoryObj<typeof MoneyInput> = {
  name: 'Styled Input Component',
  argTypes: {
    ...specificArgs,
  },
  args: {
    as: InputWrapper,
  },
}

// Just a mini showcase of how the MoneyInput Component could be used in real-life scenario
const ExampleApp = ({ ...args }) => {
  const [value, setValue] = useState<number | undefined>(undefined)

  const handleSetValue = (value: number | null) => {
    setValue(value as number)
  }

  return (
    <div
      // inline styline purposely used here just for this mini demo/showcase
      style={
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: 'var(--betterplace-viewport-min)',
        } as React.CSSProperties
      }
    >
      <MoneyInput {...args} value={value} onChange={handleSetValue} locale={args.locale} as={InputWrapper} />
    </div>
  )
}

export const AppInUse: StoryObj<typeof ExampleApp> = {
  name: 'Input Component in React App',
  render: (args) => <ExampleApp {...args} />,
  argTypes: {
    ...{
      ...specificArgs,
      showWithCurrency: {
        options: [true, false],
        control: { type: 'boolean' },
      },
      value: {},
    },
  },
  args: {
    locale: 'de',
    disabled: false,
    isError: false,
    showWithCurrency: true,
  },
}
