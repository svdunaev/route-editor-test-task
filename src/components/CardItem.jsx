import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function CardItem({text, addressId, removeAddress}) {
	const {attributes, listeners, setNodeRef, transform, transition } = useSortable({id: addressId})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}

	return (		
		<>
		<li ref={setNodeRef} style={style} {...attributes} {...listeners} draggable>
			{text}
		</li>
		<button onClick={() => removeAddress(addressId)} draggable={false}>delete</button>
		</>
	)
}
