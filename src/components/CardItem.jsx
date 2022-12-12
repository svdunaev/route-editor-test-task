import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function CardItem({text, id, handleDelete}) {
	const {attributes, listeners, setNodeRef, transform, transition } = useSortable({id: id})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}


	return (		
		<li ref={setNodeRef} style={style} {...attributes} {...listeners} draggable>
			{text}
			<span onClick={(evt) => handleDelete(evt)}>&times;</span>
		</li>
	)
}
