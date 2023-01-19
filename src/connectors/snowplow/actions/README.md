# Snowplow Events

This is where we define all Snowplow events.

_This doc is a work in progress. Some things are definitely missing... for now..._

## Overview

For full documentation of Snowplow please refer to the [official docs](https://docs.snowplow.io/docs)

## How to Read Defined Events

...

## How to Add New Events

...

If you send an event with an `identifier` that isn't in one of these `actions` files, you'll get a nasty error in your console 💀

### Recommendations

The data and analytics team has asked that all `ui` entities with an `indentifier` that contains the word `home`, `discover`, or `rec` means that this event is tied to a recommendation.
