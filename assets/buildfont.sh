#!/bin/bash
for i in `ls svg`
do
echo $i

cd ./svg/$i/
rm *48*
rm .font*
fontcustom compile ./ --debug -n "font-$i"
ls ../../
mv font-$i ../../font/
cd ../../
done
