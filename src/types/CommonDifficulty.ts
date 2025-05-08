export interface CommonDifficulty {
	Difficulty(): number | undefined;
	DifficultyColor(): string;
	DifficultyLabel(): string | undefined;
}
