# Feature: Sorting requests by proximity 
#     As a donor
#     So that I can identify people close to me which will make it easier to offer aid
#     I want to be able to view the requests by proximity

# @happy_path 
# Scenario: sorting by proximity when location services allowed 
# Given Ludwig Gorny is on the feed page 
# When he allows location services 
# Then he should see a list of all the requests sorted by proximity 

# @sad_path
# Scenario: sorting when locations services not allowed  
# Given Ludwig Gorny is on the feed page 
# When he does not allow location services 
# Then he should see a list of all the requests sorted by time posted 
