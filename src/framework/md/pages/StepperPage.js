import { StatefulWidget } from "../../tikiti/index";
import Colors from "../../utils/Colors";
import Size from "../../utils/Size";
import Stepper from "../../layouts/Stepper";
import TextView from "../../core/TextView";
import Div from "../../core/Div";
import Center from "../../layouts/Center";

class StepperPage extends StatefulWidget {
    constructor() {
        super()
        this.state = { activeStep: 1 }
        return this.connect()
    }

    switcher(key) {
        return this.stepContent(key)
    }

    stepContent(key) {
        return Div({
            style: {
                height: Size._200px,
                backgroundColor: Colors.floral_white,
            },
            children: [
                Center({
                    child: TextView(`Page ${key}`)
                })
            ]
        })
    }

    render() {
        return Stepper({
            activeStep: this.state.activeStep,
            child: this.switcher(this.state.activeStep),
            callBack: (activeStep) => this.setState({ activeStep }),
            steps: [
                'Basic Information',
                'Education Background',
                'Economic Status',
                'Review',
                'Submit',
            ]
        })
    }
}

export default StepperPage;