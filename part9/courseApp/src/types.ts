export type Name = string;
export type ExerciseCount = number;
export type Description = string;
export type GroupProjectCount = number;
export type BgMaterial = string;
export type Requierements = string[];



export interface CoursePartBase {
    name: Name;
    exerciseCount: ExerciseCount
}

export interface CoursePartDescriptive extends CoursePartBase {
    description: Description;
}

export interface CoursePartBasic extends CoursePartDescriptive {
    kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: GroupProjectCount;
    kind: "group"
}

export interface CoursePartBackground extends CoursePartDescriptive {
    backgroundMaterial: BgMaterial;
    kind: "background"
}

export interface CoursePartSpecial extends CoursePartDescriptive {
    requirements: Requierements;
    kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;