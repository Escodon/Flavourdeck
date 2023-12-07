import { useState } from "react"

interface BouncyButtonProps {
    shouldBounceEval: () => boolean
    [key: string]: any
}

var hi:BouncyButtonProps = {
    shouldBounceEval: () => {return true},
    hi: 'yo'
}
export default function BouncyButton(props: BouncyButtonProps) {
    type TransformStyle = undefined | string
    const [transformStyle, setTransformStyle] = useState<TransformStyle>(undefined)

    function feedback(): void {
        if (props.shouldBounceEval()) {
            setTransformStyle('scale(1.15)')

            setTimeout(() => {
                setTransformStyle('scale(1.0)')
                setTimeout(() => {
                    setTransformStyle(undefined)
                })

            }, 250)

            
        } else {
            // no animation
        }
    }

    return <button style={{
        transform: transformStyle
    }} onClick={feedback} {...props}>{props.children}</button>
}
