Attributes:

Attributes are simply strings.  It is the responsibility of a generator function
to interpret the meaning of these strings.


Generator functions:

Generator functions must take as arguments an array of tiles and  must return as
a return value a string (which represents the value for an attribute).
Generally, a generator function should have the complete context of the map
being generated up to the point where it is called upon. Hence each tile is
generated with the full context of each tile preceding it.
