from os import close
import sys

def getCoordList(file, index):
    list = []
    with open(file, 'r') as f:
        for line in f:
            list.append(float(line.split(",")[index]))
    return list

input = "verticesTopRight"
output = input + "Scaled.txt"
input = input + ".txt"

maxX = max(getCoordList(input, 0))
print(maxX)
minX = min(getCoordList(input, 0))
maxY = max(getCoordList(input, 1))
print(maxY)
minY = min(getCoordList(input, 1))

scale = max(400, 300)

translationX = 0
translationY = -0.5

with open(input, 'r') as f:
    with open(output, 'w') as f1:
        for line in f:
            x = float(line.split(",")[0])
            y = float(line.split(",")[1])
            x = (x) / scale + translationX
            y = (y) / scale + translationY
            f1.write(f'{x:.4f}, {y:.4f}\n')