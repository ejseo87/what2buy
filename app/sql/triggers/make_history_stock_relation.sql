drop function if exists public.make_history_stock_relation() cascade;
drop trigger if exists make_history_stock_relation_trigger on public.histories;

CREATE OR REPLACE FUNCTION public.make_history_stock_relation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.history_stock_relations ( recommendation_id, stock_id, recommendation_date)
    VALUES 
        ( NEW.recommendation_id, NEW.stock1_id, NEW.recommendation_date),
        ( NEW.recommendation_id, NEW.stock2_id, NEW.recommendation_date),
        ( NEW.recommendation_id, NEW.stock3_id, NEW.recommendation_date);
    RETURN NEW;
END;
$$;

CREATE TRIGGER make_history_stock_relation_trigger
AFTER INSERT ON public.histories
FOR EACH ROW EXECUTE FUNCTION public.make_history_stock_relation();
