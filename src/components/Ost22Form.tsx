import React from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

export interface Ost22FormProps {
	/** Current size input value */
	size: string;
	/** Optional validation error text for size */
	sizeError: string | null;
	/** Currently selected element type */
	elementType: string;
	/** Called when size changes (already trimmed/validated upstream) */
	onSizeChange: (value: string) => void;
	/** Called when element type changes */
	onElementTypeChange: (value: string) => void;
	/** Called when user clicks calculate */
	onSubmit: () => void;
	/** Disable button and show loading state */
	isCalculating?: boolean;
	/** Suffix to make input/label ids unique across instances (e.g., 'desktop' | 'mobile') */
	idSuffix?: string;
	/** Input mode to use for the size field. Desktop often uses 'decimal', mobile can prefer 'numeric'. */
	inputMode?: 'decimal' | 'numeric' | 'text';
}

export function Ost22Form(props: Ost22FormProps) {
	const {
		size,
		sizeError,
		elementType,
		onSizeChange,
		onElementTypeChange,
		onSubmit,
		isCalculating = false,
		idSuffix = 'default',
		inputMode = 'text'
	} = props;

	const sizeInputId = `size-${idSuffix}`;
	const elementTypeId = `element-type-${idSuffix}`;

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor={sizeInputId}>Введите размер с чертежа (мм)</Label>
				<Input
					id={sizeInputId}
					type="text"
					inputMode={inputMode}
					pattern="^\\d+(\\.\\d+)?$"
					step="0.001"
					value={size}
					onChange={(e) => onSizeChange(e.target.value)}
					placeholder="Например: 10.5"
					className="text-lg"
					aria-invalid={!!sizeError}
				/>
				{sizeError && (
					<div className="text-sm text-red-600">{sizeError}</div>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor={elementTypeId}>Тип элемента</Label>
				<Select value={elementType} onValueChange={(value: string) => onElementTypeChange(value)}>
					<SelectTrigger id={elementTypeId}>
						<SelectValue placeholder="Выберите тип элемента" />
					</SelectTrigger>
					<SelectContent>
						{/* Keep values consistent with existing usage */}
						<SelectItem value="hole">Отверстие</SelectItem>
						<SelectItem value="shaft">Вал</SelectItem>
						<SelectItem value="quasi-hole">Условное отверстие</SelectItem>
						<SelectItem value="quasi-shaft">Условный вал</SelectItem>
						<SelectItem value="undef">Ни отверстие, ни вал</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Button
				onClick={onSubmit}
				className="w-full bg-blue-600 hover:bg-blue-700"
				disabled={!size || !!sizeError || isCalculating}
			>
				{isCalculating ? 'Расчет...' : 'Рассчитать'}
			</Button>
		</div>
	);
}

export default Ost22Form;


