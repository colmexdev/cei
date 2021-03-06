function buildSearchQuery(conds){
	var query = "?", keys = Object.keys(conds), first = true;
	for(var i = 0; i < keys.length; i++){
		if(conds[keys[i]] === "" || conds[keys[i]] === null)
			continue;
		query = query + (!first ? "&" : "") + keys[i] + "=" + conds[keys[i]];
		first = false;
	}
	return query;
}
