const field = document.querySelector("#field");
const toolbar = document.querySelector("#toolbarLeft");
const container = document.querySelector("#container");
const newFieldGenButton = document.querySelector("#newFieldGenButton");

function generateField() {
	if (document.querySelector(".nodes") != null) {
		const previousParentDiv = document.querySelector(".nodes").parentNode;
		previousParentDiv.remove();
	}

	let pixels = document.querySelector("input[type=\"number\"]").value;
	if (pixels > 100) pixels = 100;
	else if (pixels < 2) pixels = 2;

	let size;

	if (field.offsetWidth < toolbar.offsetHeight) size = field.offsetWidth/pixels;
	else size = toolbar.offsetHeight/pixels;
		
	let fieldSize = `${pixels*size}px`;
	container.style.gridTemplateColumns = `1fr ${fieldSize} 1fr`;
	container.style.gridTemplateRows = `1fr ${fieldSize} 1fr`;

	let parentDiv = document.createElement("div");
	parentDiv.style.placeContent = "center";
	parentDiv.setAttribute("draggable", "false");
	parentDiv.style.display = "grid";
	parentDiv.style.gridTemplateColumns = `repeat(${pixels}, ${size}px)`;
	parentDiv.style.gridTemplateRows = `repeat(${pixels}, ${size}px)`;
	parentDiv.style.placeContent = "center";

	for (let i = 1; i < (pixels*pixels)+1; i++) {
		let div = document.createElement("div");
		div.classList.add("nodes");
		parentDiv.appendChild(div);
	}
		
	field.appendChild(parentDiv);

	const nodes = document.querySelectorAll(".nodes");
	nodes.forEach( (node) => {
		node.addEventListener("mousemove", (node) => {
			if (node.buttons == true) node.target.style.backgroundColor = colour;
		});
		node.addEventListener("mousedown", (node) => {
			colour = document.querySelector("input[type=\"color\"]").value;
			node.target.style.backgroundColor = colour;
		});
	});
}

generateField();

newFieldGenButton.addEventListener("click", () => {
	generateField();
});