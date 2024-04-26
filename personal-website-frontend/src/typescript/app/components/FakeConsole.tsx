import React, {useEffect, useState} from 'react';

const dir = "C:\\FisherLuba\\website"

const CONSOLE_SEPARATOR: string = ":";

const skills = [
    "Java",
    "Kotlin",
    "C",
    "C++",
    "Git",
    "JavaScript",
    "TypeScript",
    "React",
    "Spring Boot",
    "SQL",
    "HTML",
    "CSS",
    "MongoDB",
    "Python"
];

const commands: [command: string, directoryMapper: (currentDir: string) => string, output: string[]][] = [
    ["cd skills", (currentDir: string) => {
        return currentDir + "\\skills";
    }, []],
    ["ls", (currentDir: string) => {
        return currentDir;
    }, skills],
    ["", (currentDir: string) => {
        return currentDir;
    }, []]
]

export const FakeConsole = () => {
    const [currentDirectory, setCurrentDirectory] = useState<string>(dir)
    const [commandIndex, setCommandIndex] = useState(0)
    const [commandLetterIndex, setCommandLetterIndex] = useState(0)
    const [displayCommands, setDisplayCommands] =
        useState<[string, (currentDir: string) => string, string[]][]>([
            commands[0]
        ])
    const [displayOutput, setDisplayOutput] = useState<string[]>([])

    return (
        <div className="fake-console">
            {displayCommands.map((command, index) => {
                return <FakeConsoleInput
                    key={index}
                    displayOutput={displayOutput}
                    setDisplayOutput={setDisplayOutput}
                    currentDirectory={currentDirectory}
                    setCurrentDirectory={setCurrentDirectory}
                    thisCommandIndex={index}
                    commandIndex={commandIndex}
                    setCommandIndex={setCommandIndex}
                    commandLetterIndex={commandLetterIndex}
                    setCommandLetterIndex={setCommandLetterIndex}
                    displayCommands={displayCommands}
                    setDisplayCommands={setDisplayCommands}/>
            })}
        </div>
    );
}

const FakeConsoleInput = (props: {
    displayOutput: string[],
    setDisplayOutput: React.Dispatch<React.SetStateAction<string[]>>,
    currentDirectory: string,
    setCurrentDirectory: React.Dispatch<React.SetStateAction<string>>,
    thisCommandIndex: number,
    commandIndex: number,
    setCommandIndex: React.Dispatch<React.SetStateAction<number>>,
    commandLetterIndex: number,
    setCommandLetterIndex: React.Dispatch<React.SetStateAction<number>>,
    displayCommands: [string, (currentDir: string) => string, string[]][],
    setDisplayCommands: React.Dispatch<React.SetStateAction<[string, (currentDir: string) => string, string[]][]>>
}) => {
    useEffect(() => {
        if (props.commandLetterIndex < commands[props.commandIndex][0].length) {
            setTimeout(() => {
                props.setCommandLetterIndex(props.commandLetterIndex + 1)
            }, randomInt(50, 200))
        } else if (props.commandIndex < commands.length - 1) {
            setTimeout(() => {
                const newDisplay: string = props.currentDirectory + CONSOLE_SEPARATOR + " " + (commands[props.commandIndex][0]);
                props.setDisplayOutput([...props.displayOutput, newDisplay]);
                const newCompletedCommands = [...props.displayCommands, commands[props.commandIndex + 1]]
                props.setDisplayCommands(newCompletedCommands)
                props.setCommandIndex(props.commandIndex + 1)
                props.setCommandLetterIndex(0)
                props.setCurrentDirectory(commands[props.commandIndex][1](props.currentDirectory))
            }, 1_000);
        }
    }, [props]);
    const [output, setOutput] = useState<string[]>([])
    let text: string = commands[props.thisCommandIndex][0]
    if (props.thisCommandIndex < props.displayOutput.length) {
        text = props.displayOutput[props.thisCommandIndex]
        // output = commands[props.thisCommandIndex][2]
    } else if (props.thisCommandIndex === props.commandIndex) {
        text = props.currentDirectory + CONSOLE_SEPARATOR + " " +
            commands[props.thisCommandIndex][0].substring(0, props.commandLetterIndex)
    }
    if (props.thisCommandIndex < props.commandIndex || (
        props.thisCommandIndex === props.commandIndex && props.commandLetterIndex === commands[props.commandIndex][0].length)
    ) {
        setTimeout(() => {
            let tempOutput = commands[props.thisCommandIndex][2]
            if (tempOutput.length === 0) return
            setOutput(tempOutput)
        }, randomInt(800, 1_000));
    }
    if (output.length === 0 && props.thisCommandIndex === props.commandIndex && props.commandLetterIndex === commands[props.commandIndex][0].length) {
        text += (props.commandLetterIndex % 2 === 0 ? '\u2588' : "");
    }
    return (
        <>
            <div className="fake-console-input">
                <span className="fake-console-input-text">{text}</span>
            </div>
            {output.map((output, index) => {
                return <FakeConsoleOutput key={index} text={output}/>
            })}
        </>
    );
}

const FakeConsoleOutput = (props: { text: string }) => {
    return (
        <div className="fake-console-output">
            <span className="fake-console-output-text">{props.text}</span>
        </div>
    );
}

function randomInt(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}