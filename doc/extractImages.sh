for f in *.jpg;
do
  convert $f -crop 100%x50% "$f""_temp.jpg";
#  convert "$f""_temp-0.jpg" -rotate 90 "$f""_final.jpg"
#  mv "$f""_final.jpg" "dest/$f"
done
rm *temp*
#convert 1118_*.jpg -crop 50%x100% final.jpg

#rm a*[13579].jpg
#rm final*
