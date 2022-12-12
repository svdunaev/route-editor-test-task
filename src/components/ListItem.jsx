import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Card from 'react-bootstrap/Card'
import styled from 'styled-components'

const ItemGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  box-shadow: rgba(245, 245, 245, 0.2) 0 0 8px;
  line-height: 2.5
`

const Button = styled.button`
  padding: 0 1rem;
  border: none;
  box-shadow: rgba(245, 245, 245, 0.2) 0 0 8px;

  &:hover {
    box-shadow: rgba(149, 157, 165, 0.4) 0 8px 24px;
  }
`

export default function ListItem({ text, addressId, removeAddress }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: addressId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <ItemGroup>
      <Card
        body
        className="m-3"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        {text}
      </Card>
      <Button onClick={() => removeAddress(addressId)}>delete</Button>
    </ItemGroup>
  )
}
