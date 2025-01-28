enum ESbElementType {
	Empty = "Empty",
	Sprite = "Sprite",
	Animation = "Animation",
	Sample = "Sample"
}

enum ESbLayer {
	Background = "Background",
	Foreground = "Foreground",
	Fail = "Fail",
	Pass = "Pass",
	Overlay = "Overlay",
	Sound = "Sound"
}

enum ESbLayerId {
	Background = 0,
	Fail = 1,
	Pass = 2,
	Foreground = 3,
	Overlay = 4
}

enum ESbElementOrigin {
	TopLeft = "TopLeft",
	TopCentre = "TopCentre",
	TopRight = "TopRight",
	CentreLeft = "CentreLeft",
	Centre = "Centre",
	CentreRight = "CentreRight",
	BottomLeft = "BottomLeft",
	BottomCentre = "BottomCentre",
	BottomRight = "BottomRight"
}

enum ESbElementEasing {
	Linear = 0,
	Out = 1,
	In = 2,
	InQuad = 3,
	OutQuad = 4,
	InOutQuad = 5,
	InCubic = 6,
	OutCubic = 7,
	InOutCubic = 8,
	InQuart = 9,
	OutQuart = 10,
	InOutQuart = 11,
	InQuint = 12,
	OutQuint = 13,
	InOutQuint = 14,
	InSine = 15,
	OutSine = 16,
	InOutSine = 17,
	InExpo = 18,
	OutExpo = 19,
	InOutExpo = 20,
	InCirc = 21,
	OutCirc = 22,
	InOutCirc = 23,
	InElastic = 24,
	OutElastic = 25,
	OutElasticHalf = 26,
	OutElasticQuarter = 27,
	InOutElastic = 28,
	InBack = 29,
	OutBack = 30,
	InOutBack = 31,
	InBounce = 32,
	OutBounce = 33,
	InOutBounce = 34
}

enum ESbElementProperty {
	M = "M",
	MX = "MX",
	MY = "MY",
	R = "R",
	F = "F",
	S = "S",
	V = "V",
	C = "C",
	P = "P",
	L = "L",
	T = "T"
}

enum ESbElementLoopType {
	LoopForever = "LoopForever",
	LoopOnce = "LoopOnce"
}

export { ESbElementType, ESbLayer, ESbLayerId, ESbElementOrigin, ESbElementProperty, ESbElementEasing, ESbElementLoopType };
