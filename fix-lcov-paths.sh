echo "*****>OSTYPE: "$OSTYPE
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '.back' -e 's|SF:src/components/|SF:|g' coverage/lcov.info
  sed -i '.back' -e 's|SF:src/views/|SF:|g' coverage/lcov.info
  sed -i '.back' -e 's|SF:engagementpopup/|SF:|g' coverage/lcov.info
  sed -i '.back' -e 's|SF:categories/|SF:|g' coverage/lcov.info
else
  sed -i -e 's|SF:src/components/|SF:|g' coverage/lcov.info
  sed -i -e 's|SF:src/views/|SF:|g' coverage/lcov.info
  sed -i -e 's|SF:engagementpopup/|SF:|g' coverage/lcov.info
  sed -i -e 's|SF:categories/|SF:|g' coverage/lcov.info
fi
