import React, { ChangeEvent, FC, useState } from 'react'

interface AddColumnProps {
  onAdd: (text: string) => void;
}

const AddColumn:FC<AddColumnProps> = ({ onAdd }) => {
  const [text, setText] = useState<string>('');

  const addColumnList = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(text)
    setText('')
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  };

  return (
    <form onSubmit={addColumnList}>
      <input type="text" onChange={handleInputChange} value={text} />
      <button>Add item</button>
    </form>
  )
}

export default AddColumn;