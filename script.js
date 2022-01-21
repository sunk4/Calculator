const previousValueTextElement = document.querySelector("[data-previous-value]")
const currentValueTextElement = document.querySelector("[data-current-value]")
const clearAllButton = document.querySelector("[data-clear-all]")
const deleteButton = document.querySelector("[data-delete]")
const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")

class Calculator {
  constructor(previousValueTextElement, currentValueTextElement) {
    this.previousValueTextElement = previousValueTextElement
    this.currentValueTextElement = currentValueTextElement
    this.clearAll()
  }

  clearAll() {
    this.previousValue = ""
    this.currentValue = ""
    this.operation = undefined
  }

  delete() {
    this.currentValue = this.currentValue.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === "." && this.currentValue.includes(".")) {
      return
    }
    this.currentValue = this.currentValue.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentValue === "") {
      return
    }
    if (this.previousValue !== "") {
      this.calculate()
    }
    this.operation = operation
    this.previousValue = this.currentValue
    this.currentValue = ""
  }

  calculate() {
    let calculation
    const prev = parseFloat(this.previousValue)
    const current = parseFloat(this.currentValue)
    if (isNaN(prev) || isNaN(current)) {
      return
    }
    if (this.operation === "+") {
      calculation = prev + current
    } else if (this.operation === "-") {
      calculation = prev - current
    } else if (this.operation === "x") {
      calculation = prev * current
    } else if (this.operation === "/") {
      calculation = prev / current
    } else {
      return
    }
    if (this.currentValue % 1 != 0) {
      this.currentValue = calculation.toFixed(4)
      this.operation = undefined
      this.previousValue = ""
    } else {
      this.currentValue = calculation
      this.operation = undefined
      this.previousValue = ""
    }
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split(".")[0])
    const decimalDigits = stringNumber.split(".")[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ""
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentValueTextElement.innerText = this.getDisplayNumber(
      this.currentValue
    )
    if (this.operation != null) {
      this.previousValueTextElement.innerText = `${this.getDisplayNumber(
        this.previousValue
      )} ${this.operation}`
    } else {
      this.previousValueTextElement.innerText = ""
    }
  }
}

const calculator = new Calculator(
  previousValueTextElement,
  currentValueTextElement
)

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener("click", (button) => {
  calculator.calculate()
  calculator.updateDisplay()
})

clearAllButton.addEventListener("click", (button) => {
  calculator.clearAll()
  calculator.updateDisplay()
})

deleteButton.addEventListener("click", (button) => {
  calculator.delete()
  calculator.updateDisplay()
})
