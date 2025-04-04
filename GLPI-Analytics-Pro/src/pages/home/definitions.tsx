import type {
	PropsLevelPriorityIcons,
	PropsLevelPriorityStyle,
	PropsLevelTypeIcons,
	PropsLevelTypeStyle,
} from "@/@types/interface-tickets";
import {
	Bug,
	CaretCircleDoubleUp,
	Circle,
	CircleHalf,
	ClipboardText,
	Flame,
	Warning,
} from "phosphor-react";

export const levelTypeIcons: PropsLevelTypeIcons = {
	request: <ClipboardText />,
	incident: <Bug />,
};

export const levelTypeStyle: PropsLevelTypeStyle = {
	request: "bg-red-400 border-red-700",
	incident: "bg-blue-400 border-blue-700",
};

export const levelPriorityIcons: PropsLevelPriorityIcons = {
	veryLow: <Circle />,
	low: <CircleHalf />,
	average: <CaretCircleDoubleUp />,
	high: <Warning />,
	veryHigh: <Flame />,
};

export const levelPriorityStyle: PropsLevelPriorityStyle = {
	veryLow: "bg-green-400 text-gray-100 border-green-700",
	low: "bg-green-600 text-gray-100 border-green-800",
	average: "bg-yellow-400 text-white border-yellow-700",
	high: "bg-red-400 text-gray-100 border-red-700",
	veryHigh: "bg-red-600 text-gray-100 border-red-800",
};

export const priorityTranslations: Record<string, string> = {
	veryHigh: "Muito Alta",
	high: "Alta",
	average: "Médio",
	veryLow: "Muito Baixa",
	low: "Baixa"
};

export const typeTranslations: Record<string, string> = {
	request: "Requisição",
	incident: "Incidente"
}
